import { PrismaClient, ItemWeight, Order, OrderItem } from '@prisma/client';
import OrderServices from '../services/orderServices';

describe('OrderServices', () => {
  let prisma: PrismaClient;
  let orderServices: OrderServices;
  let order: Order;

  beforeAll(() => {
    prisma = new PrismaClient();
    orderServices = new OrderServices(prisma);
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
          itemWeightPrice: 10,
        },
        {
          itemId: 2,
          itemWeight: ItemWeight.Eighth,
          itemQuantity: 1,
          itemWeightPrice: 35,
        },
      ];
      const storeTax = 5;

      const salesTax = await orderServices.calculateTax(itemsData, storeTax);

      expect(salesTax).toBe(2.75); // Expected sales tax based on the provided data
    });

    it('should throw an error for items with missing price', async () => {
      const itemsData = [
        {
          itemId: 1,
          itemWeight: ItemWeight.Gram,
          itemQuantity: 1,
          itemWeightPrice: null,
        },
      ];
      const storeTax = 5;

      await expect(orderServices.calculateTax(itemsData, storeTax)).rejects.toThrow(
        'No price found for item with ID 1 and weight Gram'
      );
    });
  });

  it('should create an order with order items', async () => {
    // Test data
    const userId = 1;
    const storeId = 1;
    const addressId = 1;
    const requestedTime = new Date();
    const orderStatusId = 1;
    const paymentMethodId = 1;
    const storeTaxId = 1;
    const deliveryTip = 5;
    const paymentStatusId = 1;
    const deliveryFee = 3;
    const orderTotal = 100;
    const deliveryMethodId = 1;
    const itemsData = [
      {
        itemId: 1,
        itemWeight: ItemWeight.Gram,
        itemQuantity: 2,
        itemWeightPrice: 10,
      },
      {
        itemId: 2,
        itemWeight: ItemWeight.Eighth,
        itemQuantity: 1,
        itemWeightPrice: 20,
      },
    ];

    // Create the order
    const createdOrder = await orderServices.createOrder({
      userId,
      storeId,
      addressId,
      requestedTime,
      orderStatusId,
      paymentMethodId,
      storeTaxId,
      deliveryTip,
      paymentStatusId,
      deliveryFee,
      orderTotal,
      deliveryMethodId,
      itemsData,
    });

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
    expect(orderItem1.itemPrice).toBe(10);

    // Verify the second order item
    const orderItem2 = orderItems[1];
    expect(orderItem2).toBeDefined();
    expect(orderItem2.itemId).toBe(2);
    expect(orderItem2.itemWeight).toBe(ItemWeight.Eighth);
    expect(orderItem2.itemQuantity).toBe(1);
    expect(orderItem2.itemPrice).toBe(20);
  });
});
