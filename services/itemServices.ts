import { Prisma, PrismaClient, ItemWeight, ItemWeightPrice } from '@prisma/client';

class ItemServices {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getItemWeightPrice(itemId: number, weight: ItemWeight): Promise<number> {
    const itemWeightPrice = await this.prisma.itemWeightPrice.findFirst({
      where: {
        itemId: itemId,
        weight: weight,
      },
    });
  
    if (!itemWeightPrice) {
      throw new Error(`No price found for item with ID ${itemId} and weight ${weight}`);
    }
  
    return itemWeightPrice.price;
  }

}

export default ItemServices;
