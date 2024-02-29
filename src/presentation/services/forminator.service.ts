import { ResDataPayload } from "../../interfaces/resdata.interface";
import { SendEmailOptions } from "../../interfaces/sendEmailOptions.interface";

export class ForminatorService {
  constructor() {}

  //* Eventos
  onResData( payload: ResDataPayload ): SendEmailOptions {
    const { name_1, email_1 } = payload;
    let name: string = '';

    console.log("Datos del usuario recibidos.");
    
    if( name_1.trim().startsWith('{') ) { // Comprobar si viene un objeto o un string
      const nameParsed = Object.values( JSON.parse( name_1 ) );
      name = `${ nameParsed[0] } ${nameParsed[1]}`;
    } else {
      name = name_1
    }

    const emailOptions = {
      to: email_1,
      subject: `¡Aprovecha ésta promoción!`,
      htmlBody: this.htmlTemplate( name ),
    }

    return emailOptions;
  }

  //* Métodos
  private htmlTemplate( name: string ): string {
    const html: string = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Prueba Page</title>
      
        <style>
          .container {  
            align-items: center !important;
            background-color: white;
            display: flex;
            flex: 1 !important;
            flex-direction: row;
            flex-wrap: wrap;
            font-size: 25px;
            justify-content: center;
            padding: 5px 20px;
          }
      
          .detalles {
            flex: 2;
            text-align: center;
            max-width: 425px;
            min-width: 320px;
          }
      
          .detalles__subtitulo {
            text-transform: capitalize;
          }
      
          .detalles__descuento {
            color: #D7222B;
            font-weight: bold;
            font-size: 35px;
          }
      
          .container__descuento {
            border-radius: 55px;
            border: 1px solid #000;
            margin: 30px auto;
            padding: 20px 50px;
            width: fit-content;
          }
      
          .cupon {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
            padding: 0;
          }
      
          .btn__comprar-aqui {
            width: 350px;
          }
      
          .terminos-y-condiciones {
            font-size: 13px;
          }
      
          .terminos-y-condiciones__importante {
            color: #238822;
            font-weight: bold;
          }
      
          .imagen {
            align-items: center;
            align-self: center;
            display: flex;
            flex: 1;
            justify-content: center;
            max-width: 270px;
            min-width: 250px;
          }
          .imagen img {
            margin: 0 auto;
            width: 100%;
          }
        </style>
      
      </head>
      <body>
        <div class="container">
      
          <div class="detalles">
            <h2 class="detalles__subtitulo">Apreciable ${ name }</h2>
            <p>En agradecimiento por tu interés, te ofrecemos un <span class="detalles__descuento"><br />DESCUENTO DEL 10%</span></p>
      
            <p>Cupón válido dentro de las primeras 48 h en tu primera compra en línea</p>
      
            <div class="container__descuento">
              <p class="cupon">#BP8U5AHX</p>
            </div>
      
            <img 
              class="btn__comprar-aqui" 
              src="https://www.hortomallas.com/wp-content/uploads/2024/02/Comprar-aqui-3.gif" 
              alt="botón de comprar aquí" 
            />
      
            <p class="terminos-y-condiciones">
              Para canjear tu descuento, simplemente visita nuestro sitio web <strong>hortomallas.com</strong> y utiliza
              el código al finalizar tu compra. <span class="terminos-y-condiciones__importante">Este código solo es válido en compras en nuestro sitio web, no es transferible y solo aplica en tu primera compra.</span>
              <br /> Así que asegurate de aprovechar ésta oportunidad.
            </p>
          </div>
      
          <div class="imagen">
            <img src="https://www.hortomallas.com/wp-content/uploads/2024/02/Pagina-3-1.gif" alt="Teléfono mostrando la página de HORTOMALLAS" />
          </div>
      
        </div>
      </body>
      </html>
    `;

    return html;
  }
}


