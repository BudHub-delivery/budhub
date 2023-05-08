import nodemailer from 'nodemailer';
import EmailTemplate from './Templates/EmailTemplate';
import Registration from './Templates/registration';
import Reset from './Templates/reset';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

export class Mailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    // create reusable transporter object using a Gmail Account setup with OAuth2
    this.transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NAMECHEAP_MAIL_USER!,
        pass: process.env.NAMECHEAP_MAIL_PASS!,
      },
      dkim: {
        domainName: 'total-ticket.com',
        keySelector: 'default',
        privateKey: process.env.NAMECHEAP_DKIM_PRVT_KEY!,
      },
    });
  }

  /**
   * This function takes in the Object created in the exportRemindr.js
   * Iterates of over the Array of Objects or single object and sends mail appropriately.
   * @param {string} event - the event type
   * @param {string} email - recipient email
   * @param {string} url - URL to include in email body
   * @param {string} firstName - recipient first name
   * @returns Sending Mail to recipients in Object
   */
  async sendMail(event: string, email: string, url: string, firstName: string): Promise<void> {
    let type = '';

    switch (event) {
      case 'confirm':
        type = 'Account Confirmation Email';
        break;
      case 'reset':
        type = 'Password Reset Email';
        break;
      default:
        break;
    }

    // Determine which message template to use
    const messageHTML =
      event === 'confirm' ? EmailTemplate(firstName, Registration(url, email)) : EmailTemplate(firstName, Reset(url, email));

    // Pass all the data from above to the mailer
    await this.transporter.sendMail({
      from: `Total Ticket ${process.env.NAMECHEAP_MAIL_USER}`,
      to: `${email}`,
      subject: `${type}`,
      text: `${url}`,
      html: `${messageHTML}`,
    });

    return;
  }
}