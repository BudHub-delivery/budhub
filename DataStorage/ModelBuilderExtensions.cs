using Microsoft.EntityFrameworkCore;
using Budhub.Models;
using Budhub.Enums;
using Microsoft.AspNetCore.Identity;
using Amazon.SimpleEmail.Model.Internal.MarshallTransformations;

namespace Budhub.DataStorage;
public static class ModelBuilderExtensions
{
    public static void Seed(this ModelBuilder modelBuilder)
    {
        PasswordHasher<User> hasher = new();
        string seedPassword = "Password1!";

        // Create Company
        Company company1 = new()
        {
            Id = -1,
            Name = "Acme Herbal Delights",
            Description = "Eh... what's up doc?"
        };

        //Create a couple stores
        Store store1 = new()
        {
            Id = -1,
            CompanyId = company1.Id,
            Name = "Smoke Shop",
            OperatingHours = "9:00 AM - 5:00 PM",
            PhoneNumber = "555-555-5555"
        };
        Store store2 = new()
        {
            Id = -2,
            CompanyId = company1.Id,
            Name = "Canni Shop",
            OperatingHours = "9:00 AM - 5:00 PM",
            PhoneNumber = "666-666-6666"
        };

        //Create Taxes for Stores
        StoreTax store1Tax = new()
        {
            Id = -1,
            StoreId = store1.Id,
            TaxRate = 7.50
        };
        StoreTax store2Tax = new()
        {
            Id = -2,
            StoreId = store2.Id,
            TaxRate = 7.5
        };

        //Create some users
        User admin = new()
        {
            Id = -1,
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@mail.com"
        };
        User endUser = new()
        {
            Id = -2,
            FirstName = "End",
            LastName = "User",
            Email = "end@mail.com"
        };
        User driverUser = new()
        {
            Id = -3,
            FirstName = "Driver",
            LastName = "User",
            Email = "driver@mail.com"
        };
        User storeEmp = new()
        {
            Id = -4,
            FirstName = "Store Employee",
            LastName = "User",
            Email = "store_emp@mail.com"
        };
        User storeAdmin = new()
        {
            Id = -5,
            FirstName = "Store Admin",
            LastName = "User",
            Email = "store_admin@mail.com"
        };

        DeliveryDriver deliveryDriver = new()
        {
            Id = -1,
            UserId = driverUser.Id
        };
        List<User> users = new() { admin, endUser, driverUser, storeEmp, storeAdmin };
        foreach (User u in users)
        {
            u.Password = hasher.HashPassword(u, seedPassword);
        }

        //Create addresses for company, stores, and endUser
        Address company1Address = new()
        {
            Id = -1,
            AddressLine1 = "1234 Rabbit Lane",
            AddressLine2 = "First hole on the left",
            City = "Acme Acres",
            State = StateCode.CA,
            Zip = "91234",
            CompanyId = company1.Id
        };
        Address store1Address = new()
        {
            Id = -2,
            AddressLine1 = "555 S Street Ave",
            AddressLine2 = "Suite 10",
            City = "Acme Acres",
            State = StateCode.CA,
            Zip = "91234",
            StoreId = store1.Id
        };
        Address endUserAddress = new()
        {
            Id = -3,
            AddressLine1 = "5678 Side St",
            AddressLine2 = "Apt 200",
            DeliveryNotes = "Door Code: 5678",
            City = "Denver",
            Zip = "66666",
            State = StateCode.CO,
            UserId = endUser.Id
        };
        //Create Store Roles
        Role role1 = new() { Id = -1, RoleType = RoleType.ADMIN };
        Role role2 = new() { Id = -2, RoleType = RoleType.STORE_EMPLOYEE };
        StoreRole adminStoreRole = new()
        {
            Id = -1,
            RoleId = role1.Id,
            UserId = admin.Id,
            StoreId = store2.Id
        };
        StoreRole employeeStoreRole = new()
        {
            Id = -2,
            RoleId = role2.Id,
            UserId = storeEmp.Id,
            StoreId = store2.Id
        };

        // Create order and items
        Order endUserOrder = new()
        {
            Id = -1,
            DeliveryFee = 4.99,
            FulfillmentMethod = FulfillmentMethod.Delivery,
            OrderStatus = OrderStatus.PENDING,
            PaymentStatus = PaymentStatus.PENDING,
            RequestedTime = DateTime.UtcNow,
            UserId = endUser.Id,
            StoreId = store2.Id,
            AddressId = endUserAddress.Id,
            DeliveryDriverId = deliveryDriver.Id,
            StoreTaxId = store2Tax.Id
        };

        Item item1 = new()
        {
            Id = -1,
            ItemName = "Purple Haze",
            Type = ItemType.BULK_FLOWER,
            Strain = Strain.SATIVA,
            ContainsThc = true,
            ContainsCbd = false,
            ItemDesc = "This is a description",
            BrandName = "Some Name",    
            StoreId = store2.Id
        };
        Item item2 = new()
        {
            Id = -2,
            ItemName = "Sour Diesel",
            Type = ItemType.BULK_FLOWER,
            Strain = Strain.SATIVA,
            ContainsThc = true,
            ContainsCbd = false,
            ItemDesc = "This is a description",
            BrandName = "Some Name",  
            StoreId = store2.Id
        };

        OrderItem orderItem1 = new()
        {
            Id = -1,
            OrderId = endUserOrder.Id,
            ItemId = item1.Id
        };
        OrderItem orderItem2 = new()
        {
            Id = -2,
            OrderId = endUserOrder.Id,
            ItemId = item2.Id
        };

        List<Dictionary<string, int>> wp = new()
        {
            new Dictionary<string, int>()
            {
               { "weight", (int)ItemWeight.Gram },
               { "price", 10},
            },
            new Dictionary<string, int>()
            {
               { "weight", (int)ItemWeight.Eighth },
               { "price", 35},
            },
            new Dictionary<string, int>()
            {
               { "weight", (int)ItemWeight.Quarter },
               { "price", 60},
            },
            new Dictionary<string, int>()
            {
               { "weight", (int)ItemWeight.HalfOunce },
               { "price", 100},
            },
            new Dictionary<string, int>()
            {
               { "weight", (int)ItemWeight.Ounce },
               { "price", 180},
            }
        };
        int x = 0;
        List<ItemWeightPrice> weightPrices = new();
        foreach (var w in wp)
        {
            x--;
            weightPrices.Add(new ItemWeightPrice 
            {
                Id = x,
                ItemId = item1.Id,
                Weight = (ItemWeight) w["weight"],
                Price = w["price"]
            });
        }
        foreach (var w in wp)
        {
            x--;
            weightPrices.Add(new ItemWeightPrice 
            {
                Id = x,
                ItemId = item2.Id,
                Weight = (ItemWeight) w["weight"],
                Price = w["price"]
            });
        }

        //Add all to the DB (in proper order)
        modelBuilder.Entity<Company>().HasData(company1);

        modelBuilder.Entity<Store>().HasData(store1);
        modelBuilder.Entity<Store>().HasData(store2);

        modelBuilder.Entity<StoreTax>().HasData(store1Tax);
        modelBuilder.Entity<StoreTax>().HasData(store2Tax);

        modelBuilder.Entity<User>().HasData(users);

        modelBuilder.Entity<DeliveryDriver>().HasData(deliveryDriver);

        modelBuilder.Entity<Address>().HasData(company1Address);
        modelBuilder.Entity<Address>().HasData(store1Address);
        modelBuilder.Entity<Address>().HasData(endUserAddress);

        modelBuilder.Entity<Role>().HasData(role1, role2);

        modelBuilder.Entity<StoreRole>().HasData(adminStoreRole, employeeStoreRole);

        modelBuilder.Entity<Order>().HasData(endUserOrder);

        modelBuilder.Entity<Item>().HasData(item1, item2);

        modelBuilder.Entity<OrderItem>().HasData(orderItem1, orderItem2);

        modelBuilder.Entity<ItemWeightPrice>().HasData(weightPrices);
	}
}
