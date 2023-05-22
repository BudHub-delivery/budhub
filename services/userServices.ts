import * as bcrypt from 'bcrypt';

export default class UserServices {

  async hashPassword(plain_text_password: string){
    return await bcrypt.hash(plain_text_password, 10);
  }
  
  validateEmail(email: string) {
    let emailRegex: RegExp;
    emailRegex = new RegExp(/.+@.+\..+/);
  
    return emailRegex.test(email);
  }
}
