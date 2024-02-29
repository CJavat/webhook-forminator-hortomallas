import { Request, Response } from "express";
import { ForminatorService } from "../services/forminator.service";
import { EmailService } from "../services/email.service";
import { SendEmailOptions } from "../../interfaces/sendEmailOptions.interface";
export class PruebaForminatorController {

  // DI - Dependencies Injection
  constructor(
    private readonly forminatorService = new ForminatorService(),
    private readonly emailService = new EmailService(),
  ) {}

  webhookHandler = ( req:Request ,res: Response ) => {

    const forminatorEvent = req.headers["user-agent"]?.split(" ").at(-1);
    const payload = req.body;
    let message: SendEmailOptions | string = '';

    // Validación cuando agregas el WeebHook en Forminator y los datos vienen Vacíos
    if( forminatorEvent === 'ForminatorWebhook/1.0' && !String(payload.email_1).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
      return res.status( 200 ).json({ ok: true, msg: 'Forminator Confirmed' });
    }

    switch( forminatorEvent ) {
      case 'ForminatorWebhook/1.0':
        message = this.forminatorService.onResData( payload );
      break;

      default:
        message = `Unknown event: ${ forminatorEvent }`;
      break;
    }
    
    if( typeof message ===  'object' ) {
      try {
        return this.emailService.sendEmail( message )
          .then( () => res.status(200).json({ msg: "success" }) )
          .catch( error => res.status(500).json({ error: 'INTERNAL SERVER ERROR' + error }) );
      } catch (error) {
        console.log( error );
        return res.status( 400 ).json({ ok: false, msg: 'Bad Request' });
      }
    } else {
      return res.status(200).json({ message });
    }
  }
}