import AddressServices from '../../services/addressServices';
import { PrismaClient, Address, DeliveryAddress } from '@prisma/client';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Address Services', () => {
  let prisma: PrismaClient;
  let addressServices: AddressServices;

  const mockAddressPayload = {
    addressLine1: '1620 N Fillmore Street',
    addressLine2: 'Apt 422',
    city: 'Denver',
    state: 'CO',
    zip: '80206',
    userId: 1,
    lat: 0.0,
    long: 0.0,
    deliveryNotes: 'Leave at door'
  };

  const mockGoogleResponse = {
    status: 'OK',
    results: [
      {
        geometry: {
          location: {
            lat: 39.7426095,
            lng: -104.95222
          }
        },
        address_components: [
          {
            "long_name": "1620",
            "short_name": "1620",
            "types": [
              "street_number"
            ]
          },
          {
            "long_name": "Fillmore Street",
            "short_name": "Fillmore St",
            "types": [
              "route"
            ]
          },
          {
            "long_name": "City Park",
            "short_name": "City Park",
            "types": [
              "neighborhood",
              "political"
            ]
          },
          {
            "long_name": "Denver",
            "short_name": "Denver",
            "types": [
              "locality",
              "political"
            ]
          },
          {
            "long_name": "Denver County",
            "short_name": "Denver County",
            "types": [
              "administrative_area_level_2",
              "political"
            ]
          },
          {
            "long_name": "Colorado",
            "short_name": "CO",
            "types": [
              "administrative_area_level_1",
              "political"
            ]
          },
          {
            "long_name": "80206",
            "short_name": "80206",
            "types": [
              "postal_code"
            ]
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    prisma = new PrismaClient();
    addressServices = new AddressServices(prisma);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await prisma.$disconnect();
  });

  it('validates an address via Google', async () => {
    fetchMock.mockResponse(JSON.stringify(mockGoogleResponse));
    const response = await addressServices.validateAddressViaGoogle(mockAddressPayload);

    expect(response).toEqual(mockAddressPayload);
  });

  it('adds a delivery address', async () => {
    const createAddressMock = jest.spyOn(prisma.address, 'create').mockResolvedValue({} as Address);
    const setDeliveryAddressMock = jest.spyOn(addressServices, 'setDeliveryAddress').mockResolvedValue();

    await addressServices.addDeliveryAddress(mockAddressPayload);

    expect(createAddressMock).toBeCalledTimes(1);
    expect(setDeliveryAddressMock).toBeCalledTimes(1);
  });

  it('removes a delivery address', async () => {
    const deleteAddressMock = jest.spyOn(prisma.address, 'delete').mockResolvedValue({} as Address);

    await addressServices.removeDeliveryAddress(1);

    expect(deleteAddressMock).toBeCalledTimes(1);
    expect(deleteAddressMock).toBeCalledWith({ where: { id: 1 } });
  });

  it('sets a delivery address', async () => {
    const upsertAddressMock = jest.spyOn(prisma.deliveryAddress, 'upsert').mockResolvedValue({} as DeliveryAddress);

    await addressServices.setDeliveryAddress(1, 1);

    expect(upsertAddressMock).toBeCalledTimes(1);
  });

  it('builds an address from a Google response', async () => {
    const address = await addressServices.buildAddressFromGoogleResponse(mockGoogleResponse.results[0].address_components);

    const addressPayload = {
      addressLine1: `${address.street_number} ${address.street_name}`,
      city: address.city,
      state: address.state,
      zip: address.zip
    }

    console.log(addressPayload);

    expect(addressPayload).toEqual({
      addressLine1: '1620 Fillmore Street',
      city: 'Denver',
      state: 'CO',
      zip: '80206',
    });
  });

});