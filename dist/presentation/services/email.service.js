"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: config_1.envs.MAILER_HOST,
            port: +config_1.envs.MAILER_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config_1.envs.MAILER_EMAIL,
                pass: config_1.envs.MAILER_PASSWORD
            }
        });
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, subject, htmlBody } = options;
            try {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const sentEmail = yield this.transporter.sendMail({
                        from: {
                            name: config_1.envs.MAILER_NAME_EMAIL,
                            address: config_1.envs.MAILER_EMAIL,
                        },
                        to,
                        subject,
                        html: htmlBody,
                    });
                    console.log({
                        status: 'ok',
                        message: 'Email se envió correctamente al usuario',
                        sentEmail
                    });
                    yield this.mailSentSuccessfully();
                }), 180000);
                // }, daysToMilliseconds( 2 ) );
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    mailSentSuccessfully() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
                    from: {
                        name: config_1.envs.MAILER_NAME_EMAIL,
                        address: config_1.envs.MAILER_EMAIL,
                    },
                    to: 'multimedia@hortomallas.com',
                    subject: 'Reenvio de Correo',
                    html: `<h1>El Correo se reenvió correctamente</h1>`,
                });
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.EmailService = EmailService;
