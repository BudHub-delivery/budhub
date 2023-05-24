import { PrismaClient, ItemWeight, Order, OrderItem } from '@prisma/client';
import OrderServices from '../services/orderServices';
import ItemServices from '../services/itemServices';
import Decimal from 'decimal.js';

describe('OrderServices', () => {
  let prisma: PrismaClient;
  let orderServices: OrderServices;
  let order: Order;
  let itemServices: ItemServices;

  beforeAll(() => {
    prisma = new PrismaClient();
    orderServices = new OrderServices(prisma);
    itemServices = new ItemServices(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterAll(async () => {
    await prisma.orderItem.deleteMany({
      where: {
        orderId: order.id,
      },
    });
    await prisma.order.deleteMany({
      where: {
        id: order.id,
      },
    });
  });

  describe('calculateTax', () => {
    it('should calculate the correct sales tax', async () => {
      const itemsData = [
        {
          itemId: 1,
          itemWeight: ItemWeight.Gram,
          itemQuantity: 2,
          itemWeightPrice: new Decimal(10),
        },
        {
          itemId: 2,
          itemWeight: ItemWeight.Eighth,
          itemQuantity: 1,
          itemWeightPrice: new Decimal(35),
        },
      ];
      const storeTax = new Decimal(5);

      const salesTax = await orderServices.calculateTax(itemsData, storeTax);
      const expectedTax = new Decimal(2.75);

      expect(salesTax.toNumber()).toBe(expectedTax.toNumber()); // Expected sales tax based on the provided data
    });
  });

  describe('calculateTotal', () => {
    it('should calculate the correct sales tax', async () => {
      const itemsData = [
        {
          itemId: 1,
          itemWeight: ItemWeight.Gram,
          itemQuantity: 2,
          itemWeightPrice: new Decimal(10),
        },
        {
          itemId: 2,
          itemWeight: ItemWeight.Eighth,
          itemQuantity: 1,
          itemWeightPrice: new Decimal(35),
        },
      ];
      const storeTax = new Decimal(4.12);
      const deliveryFee = new Decimal(3);
      const deliveryTip = new Decimal(5);

      const total = await orderServices
        .calculateTotal(itemsData, storeTax, deliveryFee, deliveryTip);
      const expectedTotal = 67.12;

      expect(total.toNumber()).toBe(expectedTotal); 
    });
  });

  it('should create an order with order items', async () => {
    // Test data
    const orderObj:Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'deliveryDriverId'>  =  {
    userId: 1,
    storeId: 1,
    addressId: 1,
    requestedTime: new Date(),
    orderStatusId: 1,
    paymentMethodId: 1,
    storeTaxId: 1,
    deliveryTip: new Decimal(5),
    paymentStatusId: 1,
    deliveryFee: new Decimal(3),
    orderTotal: new Decimal(100),
    deliveryMethodId: 1,
    };
    const itemsData = [
      {
        itemId: 1,
        itemWeight: ItemWeight.Gram,
        itemQuantity: 2,
        itemWeightPrice: await itemServices.getItemWeightPrice(1, ItemWeight.Gram)
      },
      {
        itemId: 2,
        itemWeight: ItemWeight.Eighth,
        itemQuantity: 1,
        itemWeightPrice: await itemServices.getItemWeightPrice(2, ItemWeight.Eighth)
      },
    ];

    // Create the order
    const createdOrder = await orderServices.createOrder(orderObj as Order, itemsData);

    order = createdOrder

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: createdOrder.id },
    });

    // Verify the order and order items
    expect(createdOrder).toBeDefined();
    expect(createdOrder.id).toBeTruthy();
    expect(orderItems).toHaveLength(2);

    // Verify the first order item
    const orderItem1 = orderItems[0];
    expect(orderItem1).toBeDefined();
    expect(orderItem1.itemId).toBe(1);
    expect(orderItem1.itemWeight).toBe(ItemWeight.Gram);
    expect(orderItem1.itemQuantity).toBe(2);
    expect(orderItem1.itemPrice.toNumber()).toBe(10);

    // Verify the second order item
    const orderItem2 = orderItems[1];
    expect(orderItem2).toBeDefined();
    expect(orderItem2.itemId).toBe(2);
    expect(orderItem2.itemWeight).toBe(ItemWeight.Eighth);
    expect(orderItem2.itemQuantity).toBe(1);
    expect(orderItem2.itemPrice.toNumber()).toBe(35);
  });
});
