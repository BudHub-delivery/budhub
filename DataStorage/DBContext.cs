#pragma warning disable CS8618
using Microsoft.EntityFrameworkCore;
using Budhub.Models;

namespace Budhub.DataStorage;
public class DBContext : DbContext
{
    public DbSet<Address> Addresses { get; set; }
    public DbSet<BillingAddress> BillingAddresses { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Delivery> Deliveries { get; set; }
    public DbSet<DeliveryAddress> DeliveryAddresses { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
    public DbSet<DeliveryPolygon> DeliveryPolygons { get; set; }
    public DbSet<DeliveryStatus> DeliveryStatuses { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<OrderStatus> OrderStatuses { get; set; }
    public DbSet<PaymentMethod> PaymentMethods { get; set; }
    public DbSet<PaymentStatus> PaymentStatuses { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Store> Stores { get; set; }
    public DbSet<StoreRole> StoreRoles { get; set; }
    public DbSet<StoreTax> StoreTaxes { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    public DBContext(DbContextOptions options) : base(options) { }
}