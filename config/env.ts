import "dotenv/config";
import * as joi from "joi";

interface invConfig {
  APP_PORT: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: invConfig = value;

export const envs = {
  APP_PORT: config.APP_PORT,
};
