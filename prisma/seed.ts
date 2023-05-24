import { PrismaClient, 
  User, 
  ItemType, 
  StrainType,
  Store,
  Company,
  ItemWeight,
  Order
} from "@prisma/client";
import UserServices from "../services/userServices";
import OrderServices from "../services/orderServices";
import itemServices from "../services/itemServices";
import { Decimal } from 'decimal.js'

const prisma = new PrismaClient();

class Seeder {
  private prisma: PrismaClient
  private _endUser: User = {} as User;
  private _driverUser: User = {} as User;
  private _storeEmployee: User = {} as User;
  private _storeAdmin: User = {} as User;
  private _store: Store = {} as Store;
  private _company: Company = {} as Company;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this._endUser;
    this._driverUser;
    this._storeEmployee;
    this._storeAdmin;
    this._store;
    this._company;
  }

  async main() {
    await this.seed();
  }

  private async seed() {
    await this.createDeliveryMethodType();
    await this.createPaymentStatusType();
    await this.createOrderStatus();
    await this.createUser();
    await this.createAddress();
    await this.createBillingAddressAndPaymentMethod();
    await this.createDeliveryAddress();
    await this.createDeliveryDriver();
    await this.createCompany();
    await this.createStore();
    await this.createStoreRole();
    await this.createItem();
    await this.createOrder();
    await this.createMessageThread();
    await this.createMessageReadStatus();
    await this.createMessage();
    // await this.createItemImage();
    // await this.createDeliveryPolygon();
    // await this.createDeliveryMethod();
    // await this.createDeliveryStatus();
    // await this.createDelivery();
    // await this.createPaymentStatus();
  }

  private setEndUser(endUser: User): void {
    this._endUser = endUser;
  }

  private setDriverUser(driverUser: User): void {
    this._driverUser = driverUser;
  }
  private setStoreEmployee(storeEmp: User): void {
    this._storeEmployee = storeEmp;
  }
  private setStoreAdmin(storeAdmin: User): void {
    this._storeAdmin = storeAdmin;
  }

  private setStore(store: Store): void {
    this._store = store;
  }

  private setCompany(company: Company): void {
    this._company = company;
  }
  
  private async createDeliveryMethodType () {
    await this.prisma.deliveryMethod.create({
      data: {
        method: 'DELIVERY'
      }
    })
    await this.prisma.deliveryMethod.create({
      data: {
        method: 'PICKUP'
      }
    })
  }

  private async createPaymentStatusType () {
    await this.prisma.paymentStatus.create({
      data: {
        paymentStatus: 'SUCCESS'
      }
    })
    await this.prisma.paymentStatus.create({
      data: {
        paymentStatus: 'PENDING'
      }
    })
    await this.prisma.paymentStatus.create({
      data: {
        paymentStatus: 'DECLINED'
      }
    })
    await this.prisma.paymentStatus.create({
      data: {
        paymentStatus: 'REFUNDED'
      }
    })
  }

  private async createOrderStatus () {
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'PENDING'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'ACCEPTED'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'CANCELLED'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'OUT_FOR_DELIVERY'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'DELIVERED'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'READY_FOR_PICKUP'
      }
    })
    await this.prisma.orderStatus.create({
      data: {
        orderStatus: 'PICKED_UP'
      }
    })
  }

    // Create Company with a Store Attached
    private async createCompany() {
      const company = await this.prisma.company.create({
        data: {
          name: 'Big Cannabis',
          description: 'We sell big cannabis',
          address: {
            create: {
              addressLine1: '1234 Main St',
              addressLine2: 'Suite 100',
              deliveryNotes: 'Door Code: 1234',
              city: 'Denver',
              state: 'CO',
              zip: '80202'
            }
          },
          stores: {
            create: [
              {
                name: 'Smoke Shop',
                operatingHours: '9:00 AM - 5:00 PM',
                phoneNumber: '555-555-5555',
                address: {
                  create: {
                    addressLine1: '555 S Street Ave',
                    addressLine2: 'Suite 10',
                    city: 'Denver',
                    state: 'CO',
                    zip: '80202'
                  }
                },
                storeTax: {
                  create: {
                    taxRate: 7.50
                  }
                }
              }
            ]
          }
        },
        include: {
          stores: true
        }
      });

      this.setCompany(company);
    }
    
    
  
    // Create a Store, with an Address and Admin and Store Employee
    private async createStore () {
  
      const store = await this.prisma.store.create({ 
        data: {
          name: 'Canni Shop',
          operatingHours: '9:00 AM - 5:00 PM',
          phoneNumber: '555-555-5555',
          address: {
            create: {
              addressLine1: '1234 Main St',
              addressLine2: 'Suite 100',
              deliveryNotes: 'Door Code: 1234',
              city: 'Denver',
              state: 'CO',
              zip: '80202',
            }
          },
          storeTax: {
            create: {
              taxRate: 7.50
            }
          }
        }        
      });

      this.setStore(store);
  
    }

  private async createUser () {
    const userServices = new UserServices();

    // Create admin
     await this.prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@mail.com',
        password: await userServices.hashPassword('Password1!'),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: 'ADMIN' },
                where: { role: 'ADMIN' }
              }
            }
          }
        }
      }
    })

    // Create user
    const endUser = await this.prisma.user.create({
      data: {
        firstName: 'End',
        lastName: 'User',
        email: 'user@mail.com',
        password: await userServices.hashPassword('Password2!'),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: 'USER' },
                where: { role: 'USER' }
              }
            }
          }
        }
      }
    })

    this.setEndUser(endUser);

    // Create driver
    const DriverUser = await this.prisma.user.create({
      data: {
        firstName: 'Driver',
        lastName: 'User',
        email: 'driver@mail.com',
        password: await userServices.hashPassword('Password3!'),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: 'DRIVER' },
                where: { role: 'DRIVER' }
              }
            }
          }
        }
      }
    })

    this.setDriverUser(DriverUser);

    // Create storeEmployee
    const storeEmployee = await this.prisma.user.create({
      data: {
        firstName: 'Store Employee',
        lastName: 'User',
        email: 'store_emp@mail.com',
        password: await userServices.hashPassword('Password4!'),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: 'STORE_EMPLOYEE' },
                where: { role: 'STORE_EMPLOYEE' }
              }
            }
          }
        }
      }
    })

    this.setStoreEmployee(storeEmployee);

    // Create storeAdmin
    const storeAdmin = await this.prisma.user.create({
      data: {
        firstName: 'Store Admin',
        lastName: 'User',
        email: 'store_admin@mail.com',
        password: await userServices.hashPassword('Password5!'),
        userRoles: {
          create: {
            role: {
              connectOrCreate: {
                create: { role: 'STORE_ADMIN' },
                where: { role: 'STORE_ADMIN' }
              }
            }
          }
        }
      }
    });

    this.setStoreAdmin(storeAdmin);
  }

  private async createStoreRole () {

    let adminRole = await this.prisma.role.findFirst({ 
      where: { role: 'STORE_ADMIN' } 
    });

    if (!adminRole) {
      adminRole = await this.prisma.role.create({ 
        data: { role: 'STORE_ADMIN' } 
      });
    }

    let employeeRole = await this.prisma.role.findFirst({
      where: { role: 'STORE_EMPLOYEE' }
    });

    if (!employeeRole) {
      employeeRole = await this.prisma.role.create({
        data: { role: 'STORE_EMPLOYEE' }
      });
    }

    await this.prisma.storeRole.createMany({
      data: [
        {
          userId: this._storeAdmin.id,
          storeId: this._store.id,
          roleId: adminRole.id
        },
        {
          userId: this._storeEmployee.id,
          storeId: this._store.id,
          roleId: employeeRole.id
        }
      ]
    });
  }

  private async createAddress () {

    if(!this._endUser) {

      throw new Error('End user not found');
    }

    await this.prisma.address.create({
      data: {
        addressLine1: '5678 Side St',
        addressLine2: 'Apt 200',
        deliveryNotes: 'Door Code: 5678',
        city: 'Denver',
        state: 'CO',
        zip: '80202',
        userId: this._endUser?.id
      }
    })
  }

  private async createBillingAddressAndPaymentMethod() {

    const address = await this.prisma.address.findFirst({
      where: { userId: this._endUser.id }
    });

    if (!address) {
      // Handle the scenario when address is null
      // You can throw an error, log a message, or take any appropriate action
      throw new Error('Address not found for the user');
    }

    const paymentMethod = await this.prisma.paymentMethod.create({
      data: {
        userId: this._endUser.id,
      }
    });
  
    await this.prisma.billingAddress.create({
      data: {
        addressId: address.id,
        userId: this._endUser.id,
        paymentMethodId: paymentMethod.id
      }
    });
  }

  private async createDeliveryAddress () {

    const address = await this.prisma.address.findFirst({
      where: { userId: this._endUser.id }
    });

    if (!address) {
      // Handle the scenario when address is null
      // You can throw an error, log a message, or take any appropriate action
      throw new Error('Address not found for the user');
    }

    await this.prisma.deliveryAddress.create({
      data: {
        userId: this._endUser.id,
        addressId: address.id
      }
    });
  }

  private async createDeliveryDriver () {
    await this.prisma.deliveryDriver.create({
      data: {
        userId: this._driverUser.id
      }
    });
  }

  private async createItem(){
    // Create a new Item
    const itemOne = await prisma.item.create({
      data: {
        store: {
          connect: {
            id: this._store.id, // Assuming this._store is an instance of Store model
          },
        },
        itemName: "Purple Haze",
        type: ItemType.Bulk_Flower,
        strainType: StrainType.Sativa,
        containsThc: true,
        containsCbd: false,
      },
    });

    const itemTwo = await prisma.item.create({
      data: {
        store: {
          connect: {
            id: this._store.id, // Assuming this._store is an instance of Store model
          },
        },
        itemName: "Sour Diesel",
        type: ItemType.Bulk_Flower,
        strainType: StrainType.Sativa,
        containsThc: true,
        containsCbd: false,
      },
    });
  
    // Create ItemWeightPrice instances for the new item
    const weightsAndPrices = [
      { weight: ItemWeight.Gram, price: 10 },
      { weight: ItemWeight.Eighth, price: 35 },
      { weight: ItemWeight.Quarter, price: 60 },
      { weight: ItemWeight.HalfOunce, price: 100 },
      { weight: ItemWeight.Ounce, price: 180 },
    ];
  
    for (const wp of weightsAndPrices) {
      await prisma.itemWeightPrice.create({
        data: {
          item: { connect: { id: itemOne.id } },
          weight: wp.weight,
          price: wp.price,
        },
      });
    }

    for (const wp of weightsAndPrices) {
      await prisma.itemWeightPrice.create({
        data: {
          item: { connect: { id: itemTwo.id } },
          weight: wp.weight,
          price: wp.price,
        },
      });
    }
  };

  private async createItemImage () {}

  private async createDeliveryPolygon () {}

  private async createOrder () {
    const address = await this.prisma.address.findFirst({
      where: { userId: this._endUser.id }
    });

    const storeTax = await this.prisma.storeTax.findFirst({
      where: { storeId: this._store.id }
    });

    if (!address || !storeTax) {
      // Handle the scenario when address is null
      // You can throw an error, log a message, or take any appropriate action
      throw new Error('Address or storeTax not found');
    }

    const itemService = new itemServices(prisma);
    const orderService = new OrderServices(prisma);

    const itemsData = [
      {
        itemId: 1,
        itemWeight: ItemWeight.Gram,
        itemQuantity: 1,
        itemWeightPrice: await itemService.getItemWeightPrice(1, ItemWeight.Gram)
      },
      {
        itemId: 2,
        itemWeight: ItemWeight.Eighth,
        itemQuantity: 1,
        itemWeightPrice: await itemService.getItemWeightPrice(2, ItemWeight.Eighth)
      }
    ]

    const deliveryFee: Decimal = new Decimal(5.00);
    const deliveryTip: Decimal = new Decimal(15.00);

    const salesTax = await orderService.calculateTax(itemsData, new Decimal(storeTax.taxRate));

    const orderObj: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'deliveryDriverId'>  = {
      userId: this._endUser.id,
      storeId: this._store.id,
      addressId: address.id,
      requestedTime: new Date(),
      orderStatusId: 1,
      paymentMethodId: 1,
      storeTaxId: storeTax.id,
      deliveryTip: deliveryTip,
      paymentStatusId: 1,
      deliveryFee: deliveryFee,
      orderTotal: await orderService.calculateTotal(
        itemsData, 
        salesTax, 
        deliveryFee, 
        deliveryTip),
      deliveryMethodId: 1,
    };


    try {
      const createdOrder: Order = await orderService.createOrder(orderObj as Order, itemsData);
    } catch (error) {
      console.error('Error Seeing order: ', error);
    }

  }

  private async createMessageThread () {}

  private async createMessageReadStatus () {}

  private async createMessage () {}

  private async createDeliveryMethod () {}

  private async createDeliveryStatus () {}

  private async createDelivery () {}

  private async createPaymentStatus () {}

}

const seeder = new Seeder(prisma);
seeder.main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => { 
    console.log('Seeding complete');
    await prisma.$disconnect();
  });