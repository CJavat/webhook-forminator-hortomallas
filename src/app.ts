import express, { Request, Response } from "express";
import { envs } from "./config";
import { PruebaForminatorController } from "./presentation/forminator/controller";
import path from "path";

(() => {
  main();
})();

function main() {
  
  const app = express();
  const controller = new PruebaForminatorController();

  //* MIDDLEWARES
  app.use( express.json() );

  //* ROUTES
  app.post("/api/prueba", controller.webhookHandler);
  app.post('/api/enviar-comentarios-es', controller.webhookHandler);
  app.post('/api/formulario-en-contacto-es', controller.webhookHandler);
  app.post('/api/descargar-manuales-catalogos-es', controller.webhookHandler);
  
  //TODO: Crear un htmlTemplate para los de inglés.
  app.post('/api/enviar-comentarios-en', controller.webhookHandler);
  app.post('/api/formulario-en-contacto-en', controller.webhookHandler);
  app.post('/api/descargar-manuales-catalogos-en', controller.webhookHandler);

  //* Error en rutas desconocidas.
  app.use("*", ( req: Request, res: Response ) => {
    res.status(403).json({ msg: "ACCESS DENIED" });
  });


  //* STATIC FILES (borrar después)
  app.use( express.static( path.join( __dirname, '../public') ) );
  
  app.listen( envs.PORT, () => {
    console.log(`LISTENING ON PORT: ${ envs.PORT }`);
  });
}