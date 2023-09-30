using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Budhub.Migrations
{
    /// <inheritdoc />
    public partial class InitMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeliveryMethodType = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryMethods", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleType = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    OperatingHours = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stores_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryDriver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDriver", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryDriver_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Value = table.Column<string>(type: "text", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AddressLine1 = table.Column<string>(type: "text", nullable: false),
                    AddressLine2 = table.Column<string>(type: "text", nullable: true),
                    DeliveryNotes = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: false),
                    State = table.Column<int>(type: "integer", nullable: false),
                    Zip = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<double>(type: "double precision", nullable: true),
                    Longitude = table.Column<double>(type: "double precision", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    StoreId = table.Column<int>(type: "integer", nullable: true),
                    CompanyId = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Addresses_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Addresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DeliveryPolygons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PolygonJson = table.Column<string>(type: "text", nullable: false),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryPolygons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryPolygons_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ItemName = table.Column<string>(type: "text", nullable: false),
                    ItemDesc = table.Column<string>(type: "text", nullable: false),
                    BrandName = table.Column<string>(type: "text", nullable: false),
                    ContainsThc = table.Column<bool>(type: "boolean", nullable: true),
                    ContainsCbd = table.Column<bool>(type: "boolean", nullable: true),
                    CbdContent = table.Column<double>(type: "double precision", nullable: true),
                    ThcContent = table.Column<double>(type: "double precision", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: true),
                    Strain = table.Column<int>(type: "integer", nullable: true),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoreRoles_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoreRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoreTaxes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TaxRate = table.Column<double>(type: "double precision", nullable: false),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreTaxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StoreTaxes_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BillingAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillingAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillingAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BillingAddresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryAddresses_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryAddresses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemWeightPrice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ItemId = table.Column<int>(type: "integer", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemWeightPrice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemWeightPrice_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DeliveryFee = table.Column<double>(type: "double precision", nullable: false),
                    DeliveryTip = table.Column<double>(type: "double precision", nullable: false),
                    OrderTotal = table.Column<double>(type: "double precision", nullable: false),
                    FulfillmentMethod = table.Column<int>(type: "integer", nullable: false),
                    OrderStatus = table.Column<int>(type: "integer", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    RequestedTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    StoreId = table.Column<int>(type: "integer", nullable: false),
                    AddressId = table.Column<int>(type: "integer", nullable: false),
                    DeliveryDriverId = table.Column<int>(type: "integer", nullable: false),
                    StoreTaxId = table.Column<int>(type: "integer", nullable: false),
                    DeliveryMethodId = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_DeliveryDriver_DeliveryDriverId",
                        column: x => x.DeliveryDriverId,
                        principalTable: "DeliveryDriver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_DeliveryMethods_DeliveryMethodId",
                        column: x => x.DeliveryMethodId,
                        principalTable: "DeliveryMethods",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_StoreTaxes_StoreTaxId",
                        column: x => x.StoreTaxId,
                        principalTable: "StoreTaxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Deliveries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    DeliveryDriverId = table.Column<int>(type: "integer", nullable: false),
                    DeliveryMethodId = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deliveries_DeliveryDriver_DeliveryDriverId",
                        column: x => x.DeliveryDriverId,
                        principalTable: "DeliveryDriver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Deliveries_DeliveryMethods_DeliveryMethodId",
                        column: x => x.DeliveryMethodId,
                        principalTable: "DeliveryMethods",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Deliveries_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ItemId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaymentMethods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false),
                    BillingAddressId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentMethods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_BillingAddresses_BillingAddressId",
                        column: x => x.BillingAddressId,
                        principalTable: "BillingAddresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaymentMethods_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Description", "IsActive", "Name", "UpdatedAt" },
                values: new object[] { -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5010), null, "Eh... what's up doc?", true, "Acme Herbal Delights", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5010) });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "RoleType", "UpdatedAt" },
                values: new object[,]
                {
                    { -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4340), null, true, 4, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4340) },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4340), null, true, 0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4340) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "Email", "EmailConfirmed", "FirstName", "IsActive", "LastName", "Password", "UpdatedAt" },
                values: new object[,]
                {
                    { -5, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5080), null, "store_admin@mail.com", false, "Store Admin", true, "User", "AQAAAAIAAYagAAAAEIiMR6WUYGnOv2+bFDuU5iRZUISfHdpl49MoUPNKq6fKEINk2AbtRhOVymuyzIQolw==", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5080) },
                    { -4, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5080), null, "store_emp@mail.com", false, "Store Employee", true, "User", "AQAAAAIAAYagAAAAEKqF/Ha74X7sT4Zby8zvMVZVy1nR483HSWOI4IcRAPUk8YaKS4S/FZ5h2eqKuTcXGw==", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5080) },
                    { -3, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5070), null, "driver@mail.com", false, "Driver", true, "User", "AQAAAAIAAYagAAAAECYqcvNiBYfP6Fm1OuR5QLx5Z3ywobcWYlyWWA2QDN/0NoVWMr8MLLWcfDtYdWhfBQ==", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5070) },
                    { -2, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5070), null, "end@mail.com", false, "End", true, "User", "AQAAAAIAAYagAAAAEJ/EZ2zvGs+vvEobVdNy6ynHreRWBUAc9h5/gRCAWp8RX8nkYsROv2NPVAnzK3WLJA==", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5070) },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5060), null, "admin@mail.com", false, "Admin", true, "User", "AQAAAAIAAYagAAAAELgIkJ1f3GPaNSIMSsTkKeBmHqdNcu+OP73B5yzt7YF81/0gpVJe4b8xwbnCcJRcXQ==", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5060) }
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "AddressLine1", "AddressLine2", "City", "CompanyId", "CreatedAt", "DeletedAt", "DeliveryNotes", "IsActive", "Latitude", "Longitude", "State", "StoreId", "UpdatedAt", "UserId", "Zip" },
                values: new object[,]
                {
                    { -3, "5678 Side St", "Apt 200", "Denver", null, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4330), null, "Door Code: 5678", true, null, null, 5, null, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4330), -2, "66666" },
                    { -1, "1234 Rabbit Lane", "First hole on the left", "Acme Acres", -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4310), null, null, true, null, null, 4, null, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4310), null, "91234" }
                });

            migrationBuilder.InsertData(
                table: "DeliveryDriver",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "UpdatedAt", "UserId" },
                values: new object[] { -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5090), null, true, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5090), -3 });

            migrationBuilder.InsertData(
                table: "Stores",
                columns: new[] { "Id", "CompanyId", "CreatedAt", "DeletedAt", "IsActive", "Name", "OperatingHours", "PhoneNumber", "UpdatedAt" },
                values: new object[,]
                {
                    { -2, -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5020), null, true, "Canni Shop", "9:00 AM - 5:00 PM", "666-666-6666", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5020) },
                    { -1, -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5020), null, true, "Smoke Shop", "9:00 AM - 5:00 PM", "555-555-5555", new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5020) }
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "AddressLine1", "AddressLine2", "City", "CompanyId", "CreatedAt", "DeletedAt", "DeliveryNotes", "IsActive", "Latitude", "Longitude", "State", "StoreId", "UpdatedAt", "UserId", "Zip" },
                values: new object[] { -2, "555 S Street Ave", "Suite 10", "Acme Acres", null, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4330), null, null, true, null, null, 4, -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4330), null, "91234" });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "BrandName", "CbdContent", "ContainsCbd", "ContainsThc", "CreatedAt", "DeletedAt", "IsActive", "ItemDesc", "ItemName", "StoreId", "Strain", "ThcContent", "Type", "UpdatedAt" },
                values: new object[,]
                {
                    { -2, "Some Name", null, false, true, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4430), null, true, "This is a description", "Sour Diesel", -2, 1, null, 1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4430) },
                    { -1, "Some Name", null, false, true, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4400), null, true, "This is a description", "Purple Haze", -2, 1, null, 1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4400) }
                });

            migrationBuilder.InsertData(
                table: "StoreRoles",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "RoleId", "StoreId", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4350), null, true, -2, -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4350), -4 },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4350), null, true, -1, -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4350), -1 }
                });

            migrationBuilder.InsertData(
                table: "StoreTaxes",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "StoreId", "TaxRate", "UpdatedAt" },
                values: new object[,]
                {
                    { -2, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5030), null, true, -2, 7.5, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5030) },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5030), null, true, -1, 7.5, new DateTime(2023, 9, 30, 3, 46, 39, 361, DateTimeKind.Utc).AddTicks(5030) }
                });

            migrationBuilder.InsertData(
                table: "ItemWeightPrice",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "ItemId", "Price", "UpdatedAt", "Weight" },
                values: new object[,]
                {
                    { -10, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4840), null, true, -2, 180.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4840), 5 },
                    { -9, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4840), null, true, -2, 100.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4840), 4 },
                    { -8, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), null, true, -2, 60.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), 3 },
                    { -7, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), null, true, -2, 35.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), 2 },
                    { -6, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), null, true, -2, 10.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4830), 1 },
                    { -5, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4820), null, true, -1, 180.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4820), 5 },
                    { -4, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4820), null, true, -1, 100.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4820), 4 },
                    { -3, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4810), null, true, -1, 60.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4810), 3 },
                    { -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4810), null, true, -1, 35.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4810), 2 },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4680), null, true, -1, 10.0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4680), 1 }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "AddressId", "CreatedAt", "DeletedAt", "DeliveryDriverId", "DeliveryFee", "DeliveryMethodId", "DeliveryTip", "FulfillmentMethod", "IsActive", "OrderStatus", "OrderTotal", "PaymentStatus", "RequestedTime", "StoreId", "StoreTaxId", "UpdatedAt", "UserId" },
                values: new object[] { -1, -3, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4370), null, -1, 4.9900000000000002, null, 0.0, 0, true, 0, 0.0, 0, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4380), -2, -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4380), -2 });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "ItemId", "OrderId", "UpdatedAt" },
                values: new object[,]
                {
                    { -2, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4440), null, true, -2, -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4440) },
                    { -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4440), null, true, -1, -1, new DateTime(2023, 9, 30, 3, 46, 40, 78, DateTimeKind.Utc).AddTicks(4440) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_CompanyId",
                table: "Addresses",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_StoreId",
                table: "Addresses",
                column: "StoreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_UserId",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingAddresses_AddressId",
                table: "BillingAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_BillingAddresses_UserId",
                table: "BillingAddresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_DeliveryDriverId",
                table: "Deliveries",
                column: "DeliveryDriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_DeliveryMethodId",
                table: "Deliveries",
                column: "DeliveryMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_OrderId",
                table: "Deliveries",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_AddressId",
                table: "DeliveryAddresses",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryAddresses_UserId",
                table: "DeliveryAddresses",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDriver_UserId",
                table: "DeliveryDriver",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryPolygons_StoreId",
                table: "DeliveryPolygons",
                column: "StoreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_StoreId",
                table: "Items",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemWeightPrice_ItemId",
                table: "ItemWeightPrice",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ItemId",
                table: "OrderItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AddressId",
                table: "Orders",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryDriverId",
                table: "Orders",
                column: "DeliveryDriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryMethodId",
                table: "Orders",
                column: "DeliveryMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StoreId",
                table: "Orders",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StoreTaxId",
                table: "Orders",
                column: "StoreTaxId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_BillingAddressId",
                table: "PaymentMethods",
                column: "BillingAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_OrderId",
                table: "PaymentMethods",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentMethods_UserId",
                table: "PaymentMethods",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreRoles_RoleId",
                table: "StoreRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreRoles_StoreId",
                table: "StoreRoles",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreRoles_UserId",
                table: "StoreRoles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Stores_CompanyId",
                table: "Stores",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreTaxes_StoreId",
                table: "StoreTaxes",
                column: "StoreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId",
                table: "UserRoles",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Deliveries");

            migrationBuilder.DropTable(
                name: "DeliveryAddresses");

            migrationBuilder.DropTable(
                name: "DeliveryPolygons");

            migrationBuilder.DropTable(
                name: "ItemWeightPrice");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "PaymentMethods");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "StoreRoles");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "BillingAddresses");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "DeliveryDriver");

            migrationBuilder.DropTable(
                name: "DeliveryMethods");

            migrationBuilder.DropTable(
                name: "StoreTaxes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
