import { PrismaClient, ItemWeight, Item, ItemWeightPrice, ItemType, StrainType } from '@prisma/client';
import ItemServices from '../services/itemServices';
import { Decimal } from 'decimal.js';

describe('ItemServices', () => {

  let prisma: PrismaClient;
  let itemServices: ItemServices;
  let items: Item[];

  beforeAll(() => {
    prisma = new PrismaClient();
    itemServices = new ItemServices(prisma); 
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    
    const itemIds = items.map((item) => item.id);

    await prisma.itemWeightPrice.deleteMany({
      where: {
        itemId: {
          in: itemIds,
        },
      },
    });

    await prisma.item.deleteMany({
      where: {
        id: {
          in: itemIds,
        },
      },
    });
    
  });

  describe('getItemWeightPrice', () => {
    it('should return the item weight price for a given item ID and weight', async () => {

      const item = await prisma.item.create({
        data: {
          store: {
            connect: {
              id: 1,
            },
          },
          itemName: "Test Item",
          type: ItemType.Bulk_Flower,
          strainType: StrainType.Sativa,
          containsThc: true,
          containsCbd: false,
          thcContent: 0.2,
          cbdContent: 0.0,
          ItemWeightPrice: {
            create: [
              {
                weight: ItemWeight.Gram,
                price: 10,
              },
            ]
          }
        },
      });

      items = [item];

      const weight = ItemWeight.Gram;
      const expectedPrice = new Decimal(10);

      const itemWeightPrice = await itemServices.getItemWeightPrice(item.id, weight);

      expect(itemWeightPrice.toNumber()).toBe(expectedPrice.toNumber());
    });
  });
});
