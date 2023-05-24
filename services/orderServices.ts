import { PrismaClient, Order, ItemWeight } from '@prisma/client';
import { Decimal } from 'decimal.js';

class OrderServices {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async calculateTax(itemsData: {
    itemId: number;
    itemWeight: ItemWeight;
    itemQuantity: number;
    itemWeightPrice: Decimal;
  }[], storeTax: Decimal): Promise<Decimal> {
    let orderCost = new Decimal(0);
  
    for (const item of itemsData) {
      // if (item.itemWeightPrice === null) {
      //   throw new Error(`No price found for item with ID ${item.itemId} and weight ${item.itemWeight}`);
      // }
  
      orderCost = orderCost.plus(item.itemWeightPrice || new Decimal(0)).times(item.itemQuantity);
    }
  
    const salesTax = orderCost.times(storeTax.dividedBy(100));

    return salesTax;
  }
  

  async calculateTotal(itemsData: { 
    itemId: number; 
    itemWeight: ItemWeight;
    itemQuantity: number; 
    itemWeightPrice: Decimal; 
  }[], taxes: Decimal, deliveryFee: Decimal, deliveryTip: Decimal): Promise<Decimal> {
    let orderTotal = new Decimal(0);
  
    itemsData.forEach(item => {
      // if (item.itemWeightPrice === null) {
      //   throw new Error(`No price found for item with ID ${item.itemId} and weight ${item.itemWeight}`);
      // }

      const itemTotalPrice = item.itemWeightPrice.times(item.itemQuantity);
      console.log(itemTotalPrice);
      orderTotal = orderTotal.plus(itemTotalPrice);
    });    
  
    orderTotal = orderTotal.plus(taxes).plus(deliveryFee).plus(deliveryTip);   
    return orderTotal;
  }

  async createOrder(orderObj: Order, 
    orderItems: { 
      itemId: number; 
      itemWeight: ItemWeight; 
      itemQuantity: number; 
      itemWeightPrice: Decimal }[]
      ): Promise<Order> {
  

    const createdOrder = await this.prisma.order.create({
      data: {
        store: { connect: { id: orderObj.storeId } },
        user: { connect: { id: orderObj.userId } },
        address: { connect: { id: orderObj.addressId } },
        requestedTime: orderObj.requestedTime,
        orderStatus: { connect: { id: orderObj.orderStatusId } },
        paymentMethod: { connect: { id: orderObj.paymentMethodId } },
        paymentStatus: { connect: { id: orderObj.paymentStatusId } },
        storeTax: { connect: { id: orderObj.storeTaxId } },
        deliveryMethod: { connect: { id: orderObj.deliveryMethodId } },
        deliveryTip: orderObj.deliveryTip,
        deliveryFee: orderObj.deliveryFee,
        orderTotal: orderObj.orderTotal,
        orderItems: {
          createMany: {
            data: orderItems.map(itemData => ({
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
