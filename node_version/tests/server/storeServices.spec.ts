import { PrismaClient, RoleType, Store } from "@prisma/client";
import StoreServices from "../../services/storeServices";
import { StorePayload, UserPayload } from "../../services/storeServices";
import { AddressPayload } from "../../services/addressServices";

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    // You should also mock other methods from PrismaClient you use in your code here.
    // For example, if you use prisma.user.create in your code, you should also mock it:
    // create: jest.fn(),
  },
  storeRole: {
    create: jest.fn(),
  },
  // Add other services you use from PrismaClient here, e.g., prisma.role or prisma.store

  store: {
    create: jest.fn(),
  },
};

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
}));

const mockUserServices = {
  createUser: jest.fn(),
  generateTempPassword: jest.fn(),
};

jest.mock("../../services/userServices", () => jest.fn().mockImplementation(() => mockUserServices));


describe("StoreServices", () => {
  let storeServices: StoreServices;
  let prisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    prisma = new PrismaClient() as any;
    storeServices = new StoreServices(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new store", async () => {
    const storePayload: StorePayload = {
      name: "Test Store",
      operatingHours: "8AM - 5PM",
      phoneNumber: "123-456-7890",
    };

    const addressPayload: AddressPayload = {
      addressLine1: "123 Test St",
      addressLine2: '',
      userId: null,
      city: "Test City",
      state: "Test State",
      zip: "12345",
      latitute: 123.16,
      longitute: 52.06,
      deliveryNotes: null,
    };

    const store: StorePayload = {
      name: storePayload.name,
      operatingHours: storePayload.operatingHours,
      phoneNumber: storePayload.phoneNumber,
    };

    mockPrisma.store.create.mockResolvedValue(store);

    const result = await storeServices.createStore(storePayload, addressPayload);
    
    expect(result).toEqual(store);
    expect(prisma.store.create).toHaveBeenCalledWith({
      data: {
        ...storePayload,
        address: {
          create: {
            ...addressPayload
          }
        }
      }
    });
  });

  // Mock UserServices
  it("should add a store user", async () => {
    const storeId = 1;
    const roleType: RoleType = "ADMIN";
    const userPayload: UserPayload = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    const user = {
      id: 1,
      ...userPayload,
    };

    // Mock a case where user does not already exist
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockUserServices.createUser.mockResolvedValue(user);
    mockUserServices.generateTempPassword.mockResolvedValue("tempPassword");

    const result = await storeServices.addStoreUser(storeId, userPayload, roleType);

    expect(result).toEqual(user);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: userPayload.email } });
    expect(mockUserServices.createUser).toHaveBeenCalledWith({
      ...userPayload,
      password: "tempPassword",
    });
  });

  it("should add a store user role if the user already exists", async () => {
    const storeId = 1;
    const roleType: RoleType = "ADMIN";
    const userPayload: UserPayload = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    };

    const user = {
      id: 1,
      ...userPayload,
    };

    // Mock a case where user already exists
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await storeServices.addStoreUser(storeId, userPayload, roleType);

    expect(result).toEqual(user);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: userPayload.email } });
    expect(mockUserServices.createUser).not.toHaveBeenCalled();
  });
  // Similarly, write more tests for addStoreUser, addStoreRole, removeStoreRole, getStoreUsers, getStoreUser, setStoreTaxRate
  // The pattern is the same: prepare the input, mock the function call, check the function was called with correct arguments and/or the return value is correct
});
