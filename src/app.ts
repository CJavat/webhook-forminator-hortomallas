import express from "express";
import { envs } from "./config";
import { PruebaForminatorController } from "./presentation/prueba-forminator/controller";
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
  // app.post("/api/prueba", (req, res) => {
  //   console.log(req.headers);
  // }) ;

  //* STATIC FILES (borrar después)
  app.use( express.static( path.join( __dirname, '../public') ) );
  
  app.listen( envs.PORT, () => {
    console.log(`LISTENING ON PORT: ${ envs.PORT }`);
  });
}