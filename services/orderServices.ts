import { PrismaClient, Prisma, Order, ItemWeight, OrderItem, PrismaPromise } from '@prisma/client';

class OrderServices {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async calculateTax(itemsData: {
    itemId: number;
    itemWeight: ItemWeight;
    itemQuantity: number;
    itemWeightPrice: number | null;
  }[], storeTax: number): Promise<number> {
    let orderCost = 0;
  
    for (const item of itemsData) {
      if (item.itemWeightPrice === null) {
        throw new Error(`No price found for item with ID ${item.itemId} and weight ${item.itemWeight}`);
      }
  
      orderCost += (item.itemWeightPrice || 0) * item.itemQuantity;
    }
  
    const salesTax = orderCost * (storeTax / 100);
    return salesTax;
  }
  

  async calculateTotal(itemsData: { 
    itemId: number, 
    itemWeight: ItemWeight, 
    itemQuantity: number, 
    itemWeightPrice: number 
  }[], taxes: number, deliveryFee: number, deliveryTip: number): Promise<number> {
    let total = 0;
  
    itemsData.forEach(item => {
      const itemTotalPrice = item.itemWeightPrice * item.itemQuantity;
      total += itemTotalPrice;
    });
  
    total += taxes + deliveryFee + deliveryTip;
  
    return total;
  }

  async createOrder({
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
  }: {
    userId: number;
    storeId: number;
    addressId: number;
    requestedTime: Date;
    orderStatusId: number;
    paymentMethodId: number;
    storeTaxId: number;
    deliveryTip: number;
    paymentStatusId: number;
    deliveryFee: number;
    orderTotal: number;
    deliveryMethodId: number;
    itemsData: { itemId: number; itemWeight: ItemWeight; itemQuantity: number; itemWeightPrice: number }[];
  }): Promise<Order> {
  
    const createdOrder = await this.prisma.order.create({
      data: {
        store: { connect: { id: storeId } },
        user: { connect: { id: userId } },
        address: { connect: { id: addressId } },
        requestedTime: requestedTime,
        orderStatus: { connect: { id: orderStatusId } },
        paymentMethod: { connect: { id: paymentMethodId } },
        paymentStatus: { connect: { id: paymentStatusId } },
        storeTax: { connect: { id: storeTaxId } },
        deliveryMethod: { connect: { id: deliveryMethodId } },
        deliveryTip: deliveryTip,
        deliveryFee: deliveryFee,
        orderTotal: orderTotal,
        orderItems: {
          createMany: {
            data: itemsData.map(itemData => ({
              itemId: itemData.itemId,
              itemQuantity: itemData.itemQuantity,
              itemWeight: itemData.itemWeight,
              itemPrice: itemData.itemWeightPrice,
            })),
          },
        },
      },
      include: {
        orderItems: true,
      },
    });
  
    return createdOrder;
  }  
  
}

export default OrderServices;
