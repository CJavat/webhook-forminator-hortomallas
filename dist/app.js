"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const controller_1 = require("./presentation/forminator/controller");
(() => {
    main();
})();
function main() {
    const app = (0, express_1.default)();
    const controller = new controller_1.PruebaForminatorController();
    //* MIDDLEWARES
    app.use(express_1.default.json());
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
    app.use("*", (req, res) => {
        res.status(403).json({ msg: "ACCESS DENIED" });
    });
    setInterval(() => {
        console.log('Servidor Activo');
    }, 120000);
    //* STATIC FILES
    // app.use( express.static( path.join( __dirname, '../public') ) );
    app.listen(config_1.envs.PORT, () => {
        console.log(`LISTENING ON PORT: ${config_1.envs.PORT}`);
    });
}
