export default class AddressServices {
  
  validateZipCode(zipCode: string) {
    let emailRegex: RegExp;
    emailRegex = new RegExp(/.+@.+\..+/);
  
    return emailRegex.test(zipCode);
  }

  fetchLatLong(
    address_line_1: string, 
    address_line_2: string, 
    city: string, 
    state: string, 
    zipCode: string
  ) {
    // Do stuff with Google Maps API
    // https://developers.google.com/maps/documentation/geocoding/overview
    const lat: number = 0.0;
    const long: number = 0.0; 

    return { lat, long };
   }
}
