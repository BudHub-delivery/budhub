import { 
  PrismaClient, 
  Store,
  User, 
  RoleType,
  Order,
  Item,
  StoreTax, 
} from "@prisma/client";

import { AddressPayload } from "./addressServices";
import UserServices from "./userServices";

interface DeliveryPolygon {
  name: string;
  coordinates: [number, number][];
}

export interface StorePayload {
  name: string;
  operatingHours: string;
  phoneNumber: string;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export default class StoreServices {

  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createStore(
    storePayload: StorePayload, 
    addressPayload: AddressPayload): Promise<Store> {

    return await this.prisma.store.create({
      data: {
        ...storePayload,
        address: {
          create: {
            ...addressPayload
          }
        }
      }
    });

  }

  async addStoreUser(
    storeId: number, 
    userPayload: UserPayload, 
    roleType: RoleType): Promise<User> {

    let user = await this.prisma.user.findUnique({
      where: { email: userPayload.email }
    });

    // If the user already exists, we will just add the store role
    if(user){
      this.addStoreRole(user, storeId, roleType);
    } 

    // If the user does not exist, we will create the user and add the store role
    if(!user){
      const userServices = new UserServices();
      user = await userServices.createUser({
        ...userPayload,
        password: await userServices.generateTempPassword()
      },);
      await this.addStoreRole(user, storeId, roleType);
    }

    // this.sendUserInvitationEmail(user);

    return user

  }

  async addStoreRole(user: User, storeId: number, roleType: RoleType ) {
    await this.prisma.storeRole.create({
      data: {
        store: {
          connect: {
            id: storeId
          }
        },
        user: {
          connect: {
            id: user.id
          }
        },
        role: {
          connectOrCreate: {
            create: { role: roleType },
            where: { role: roleType }
          }
        }
      }
    }); 
  }

  async removeStoreRole(user: User, storeId: number, roleType: RoleType ) {
    const roleId = await this.prisma.role.findUnique({
      where: {
        role: roleType
      }
    });

    if(!roleId) {
      throw new Error('Role not found');
    }

    await this.prisma.storeRole.deleteMany({
      where: {
        storeId: storeId,
        userId: user.id,
        roleId: roleId.id
      }
    }); 
  }

  async getStoreUsers(storeId: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        storeRoles: {
          some: {
            storeId: storeId
          }
        }
      }
    });
  }

  async getStoreUser(storeId: number, userId: number): Promise<User> {

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        storeRoles: {
          some: {
            storeId: storeId
          }
        }
      }
    });

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async setStoreTaxRate(storeId: number, taxRate: number): Promise<StoreTax> {
    return await this.prisma.storeTax.upsert({
      where: {
        storeId: storeId
      },
      update: {
        taxRate: taxRate
      },
      create: {
        store: {
          connect: {
            id: storeId
          }
        },
        taxRate: taxRate
      }
    });
  }

}