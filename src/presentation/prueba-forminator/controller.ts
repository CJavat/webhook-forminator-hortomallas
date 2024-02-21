import { Request, Response } from "express";
import { ForminatorPruebaService } from "../services/forminator-prueba.service";
import { EmailService } from "../services/email.service";
import { SendEmailOptions } from "../../interfaces/prueba-sendEmailOptions.interface";


export class PruebaForminatorController {

  // DI - Dependencies Injection
  constructor(
    private readonly forminatorPruebaService = new ForminatorPruebaService(),
    private readonly emailService = new EmailService(),
  ) {}

  webhookHandler = ( req:Request ,res: Response ) => {
    const forminatorEvent = req.headers["user-agent"]?.split(" ").at(-1);
    const payload = req.body;
    let message: SendEmailOptions | string;
    
    switch( forminatorEvent ) {
      case 'ForminatorWebhook/1.0':
        message = this.forminatorPruebaService.onResData( payload );
      break;

      default:
        message = `Unknown event: ${ forminatorEvent }`;
      break;
    }

    if( typeof message ===  'object' ) {
      return this.emailService.sendEmail( message )
        .then( () => res.status(200).json({ msg: "success" }) )
        .catch( error => res.status(500).json({ error: 'INTERNAL SERVER ERROR' + error }) );
    } else {
      return res.status(200).json({ message });
    }
  }
}