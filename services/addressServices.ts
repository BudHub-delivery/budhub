import { Address, PrismaClient } from "@prisma/client";


export interface AddressPayload {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  userId: number | null;
  latitute: number;
  longitute: number;
  deliveryNotes: string | null;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export default class AddressServices {
  private prisma: PrismaClient;
  private google_api_key: string;

  constructor(prisma: PrismaClient,) {
    this.prisma = prisma;
    this.google_api_key = process.env.GOOGLE_API_KEY || '';
  }

  /**
   * Validates the address using Google Maps API and returns the validated address to the user.
   * @param addressPayload The address payload to be validated.
   * @returns The validated address payload.
   * @throws Error if the address is invalid.
   */
  async validateAddressViaGoogle(addressPayload: AddressPayload) {
    // https://developers.google.com/maps/documentation/geocoding/overview
    
    const addressToValidate = [
      addressPayload.addressLine1, 
      addressPayload.city, 
      addressPayload.state, 
      addressPayload.zip
    ].join(', ');

    const encodedAddress = encodeURIComponent(addressToValidate)

    const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.google_api_key}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    const response = await data.json()

    if (response.status === 'OK') {
      const addressComponents = await this.buildAddressFromGoogleResponse(response.results[0].address_components)
      addressPayload.addressLine1 = `${addressComponents.street_number} ${addressComponents.street_name}`
      addressPayload.city = addressComponents.city
      addressPayload.state = addressComponents.state
      addressPayload.zip = addressComponents.zip
      addressPayload.latitute = response.results[0].geometry.location.lat
      addressPayload.longitute = response.results[0].geometry.location.lng
      
      return addressPayload
    }

    throw new Error('Invalid Address Request')
  
  }

  /**
   * Adds a delivery address to the database after it has been validated by the user.
   * @param addressPayload The validated address payload.
   * @returns The created address object.
   * @throws Error if the UserId is missing when creating the address.
   */
  async addDeliveryAddress(addressPayload: AddressPayload): Promise<Address> {
    // Do stuff with Google Maps API
    // https://developers.google.com/maps/documentation/geocoding/overview

    if (!addressPayload.userId){
      throw new Error('Missing UserId when creating address')
    }

    const address: Address = await this.prisma.address.create({
      data: {
        addressLine1: addressPayload.addressLine1,
        addressLine2: addressPayload.addressLine2,
        city: addressPayload.city,
        state: addressPayload.state,
        zip: addressPayload.zip,
        userId: addressPayload.userId,
        latitude: addressPayload.latitute,
        longitude: addressPayload.longitute,
        deliveryNotes: addressPayload.deliveryNotes
      }   
    });
        
    await this.setDeliveryAddress(address.id, addressPayload.userId);

    return address;
  }

  /**
   * Removes a delivery address from the database.
   * @param addressId The ID of the address to be removed.
   */
  async removeDeliveryAddress(addressId: number) {
    await this.prisma.address.delete({
      where: {
        id: addressId
      }
    });
  }
  
  /**
  * Sets the delivery address for a user by creating or updating the delivery address record.
  * @param addressId The ID of the address.
  * @param userId The ID of the user.
  */
  async setDeliveryAddress(addressId: number, userId: number) {
    await this.prisma.deliveryAddress.upsert({
      where: {
        userId_addressId: {
          userId: userId,
          addressId: addressId
        }
      },
      update: {
        addressId: addressId
      },
      create: {
        addressId: addressId,
        userId: userId
      }
    });
  }

  /**
   * Builds an address object from the Google Maps API response.
   * @param address_components The address components received from the Google Maps API.
   * @returns The address object.
   */
  async buildAddressFromGoogleResponse(address_components: AddressComponent[]) {
   
   const address: { [key: string]: string } = {};

   // Iterate through the address components
   address_components.forEach((component: any) => {
     component.types.forEach((type: string) => {
       switch (type) {
         case 'street_number':
           address.street_number = component.long_name;
           break;
         case 'route':
           address.street_name = component.long_name;
           break;
         case 'locality':
           address.city = component.long_name;
           break;
         case 'administrative_area_level_1':
           address.state = component.short_name;
           break;
         case 'postal_code':
           address.zip = component.long_name;
           break;
         default:
           break;
       }
     })
   })

   return address;
  }
}
