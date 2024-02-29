"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").default(3000).asPortNumber(),
    MAILER_HOST: (0, env_var_1.get)("MAILER_HOST").required().asString(),
    MAILER_PORT: (0, env_var_1.get)("MAILER_PORT").required().asString(),
    MAILER_SERVICE: (0, env_var_1.get)("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)("MAILER_EMAIL").required().asEmailString(),
    MAILER_PASSWORD: (0, env_var_1.get)("MAILER_PASSWORD").required().asString(),
    MAILER_NAME_EMAIL: (0, env_var_1.get)("MAILER_NAME_EMAIL").required().asString(),
};
