"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PruebaForminatorController = void 0;
const forminator_service_1 = require("../services/forminator.service");
const email_service_1 = require("../services/email.service");
class PruebaForminatorController {
    // DI - Dependencies Injection
    constructor(forminatorService = new forminator_service_1.ForminatorService(), emailService = new email_service_1.EmailService()) {
        this.forminatorService = forminatorService;
        this.emailService = emailService;
        this.webhookHandler = (req, res) => {
            var _a;
            const forminatorEvent = (_a = req.headers["user-agent"]) === null || _a === void 0 ? void 0 : _a.split(" ").at(-1);
            const payload = req.body;
            let message = '';
            // Validación cuando agregas el WeebHook en Forminator y los datos vienen Vacíos
            if (forminatorEvent === 'ForminatorWebhook/1.0' && !String(payload.email_1).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return res.status(200).json({ ok: true, msg: 'Forminator Confirmed' });
            }
            switch (forminatorEvent) {
                case 'ForminatorWebhook/1.0':
                    message = this.forminatorService.onResData(payload);
                    break;
                default:
                    message = `Unknown event: ${forminatorEvent}`;
                    break;
            }
            if (typeof message === 'object') {
                try {
                    return this.emailService.sendEmail(message)
                        .then(() => res.status(200).json({ msg: "success" }))
                        .catch(error => res.status(500).json({ error: 'INTERNAL SERVER ERROR' + error }));
                }
                catch (error) {
                    console.log(error);
                    return res.status(400).json({ ok: false, msg: 'Bad Request' });
                }
            }
            else {
                return res.status(200).json({ message });
            }
        };
    }
}
exports.PruebaForminatorController = PruebaForminatorController;
