import { Prisma, PrismaClient, ItemWeight, ItemWeightPrice } from '@prisma/client';
import { Decimal } from 'decimal.js';

class ItemServices {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getItemWeightPrice(itemId: number, weight: ItemWeight): Promise<Decimal> {
    const itemWeightPrice = await this.prisma.itemWeightPrice.findFirst({
      where: {
        itemId: itemId,
        weight: weight,
      },
    });
  
    if (!itemWeightPrice) {
      throw new Error(`No price found for item with ID ${itemId} and weight ${weight}`);
    }

    const price = itemWeightPrice.price;
  
    return price;
  }

}

export default ItemServices;
