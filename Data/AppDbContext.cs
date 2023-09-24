using Microsoft.EntityFrameworkCore;
using Budhub.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<Message> Messages { get; set; }
    // Add other DbSets for your other entities here...

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the User to Message relationship for AuthoredMessages and ReceivedMessages
        modelBuilder.Entity<User>()
            .HasMany(u => u.AuthorMessages)
            .WithOne(m => m.Author)
            .HasForeignKey(m => m.AuthorId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.ReceivedMessages)
            .WithOne(m => m.Recipient)
            .HasForeignKey(m => m.RecipientId);

        // Add other Fluent API configurations here as needed...
    }
}
