import nodemailer, { TransportOptions } from 'nodemailer';

interface userPayload {
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  storeName?: string | null;
}

interface CustomTransportOptions extends TransportOptions {
  host: string;
}

export default class MailerService {

  private transporter: nodemailer.Transporter;
  private event: string;
  private userPayload: userPayload;

  constructor(event: string, userPayload: userPayload) {
    this.event = event;
    this.userPayload = userPayload;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // // Send mail with defined transport object
  // async sendMail(): Promise<any> {
  //   return await this.transporter.sendMail({
  //     from: process.env.SMTP_SENDER,
  //     to: this.userPayload.email,
  //     subject: await this.getSubject(),
  //     text: this.userPayload.url,
  //     html: await this.messageTemplate()
  //   });
  // }

  // Send mail with defined transport object
  async sendMail(): Promise<any> {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_SENDER,
        to: this.userPayload.email,
        subject: await this.getSubject(),
        text: this.userPayload.url,
        html: await this.messageTemplate()
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  // Get subject line for email
  async getSubject(): Promise<string> {

    let subject: string = '';

    switch(this.event){
      case 'storeUserInvitation':
        subject = 'You have been invited to join a store';
        break;
      case 'passwordReset':
        subject = 'Password Reset';
        break;
      case 'userInvitation':
        subject = 'You have been invited to join BudHub';
        break;
      default:
        subject = '';
        break;
    }

    return subject
  }

  // Get message template for email
  async messageTemplate(): Promise<string> {

    let message: string = '';

    switch(this.event){
      case 'storeUserInvitation':
        message = `
          <p>You have been invited to join the ${this.userPayload.storeName} store.</p>
          <p>Click <a href="${this.userPayload.url}">here</a> to join.</p>
        `;
        break;
      case 'passwordReset':
        message = `<p>Click <a href="${this.userPayload.url}">here</a> reset your password.</p>`;
        break;
      case 'userInvitation':
        message = `<p>Click <a href="${this.userPayload.url}">here</a> reset your password.</p>`;
      default:
        message = '';
        break;
    }
    return message;
  }


}
