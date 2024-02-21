import 'dotenv/config';
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").default(3000).asPortNumber(),
  MAILER_HOST: get("MAILER_HOST").required().asString(),
  MAILER_PORT: get("MAILER_PORT").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asEmailString(),
  MAILER_PASSWORD: get("MAILER_PASSWORD").required().asString(),
  MAILER_NAME_EMAIL: get("MAILER_NAME_EMAIL").required().asString(),
}