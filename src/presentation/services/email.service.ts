import nodemailer from "nodemailer";
import { envs } from "../../config";

import { daysToMilliseconds } from "../../helper/daysToMilliseconds";

import { SendEmailOptions } from "../../interfaces/sendEmailOptions.interface";

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: envs.MAILER_HOST,
    port: +envs.MAILER_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_PASSWORD
    }
  });
  
  constructor() {}

  async sendEmail( options: SendEmailOptions ): Promise<boolean> {

    const { to, subject, htmlBody } = options;
    
    try {
       setTimeout( async () => { //? Para enviar el correo 2 días después.
        
        const sentEmail = await this.transporter.sendMail({
          from: {
            name: envs.MAILER_NAME_EMAIL,
            address: envs.MAILER_EMAIL,
          },
          to,
          subject,
          html: htmlBody,
        })
        
        console.log({
          status: 'ok',
          message: 'Email se envió correctamente al usuario', 
          sentEmail
        });

        await this.mailSentSuccessfully();
      }, daysToMilliseconds( 2 ) );
      
      
      return true;
    } catch (error) {
      console.log( error );
      return false;
    }
  }

  private async mailSentSuccessfully() {
    try {
      await this.transporter.sendMail({
        from: {
          name: envs.MAILER_NAME_EMAIL,
          address: envs.MAILER_EMAIL,
        },
        to: 'multimedia@hortomallas.com',
        subject: 'Reenvio de Correo',
        html: `<h1>El Correo se reenvió correctamente</h1>`,
      })

      return true;
    } catch (error) {
      return false;
    }
  }
}

