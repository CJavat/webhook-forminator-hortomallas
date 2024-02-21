import express, { Request, Response } from "express";
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
  app.use("*", ( req: Request, res: Response ) => {
    res.status(403).json({ msg: "ACCESS DENIED" });
  });


  //* STATIC FILES (borrar después)
  app.use( express.static( path.join( __dirname, '../public') ) );
  
  app.listen( envs.PORT, () => {
    console.log(`LISTENING ON PORT: ${ envs.PORT }`);
  });
}