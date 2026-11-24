import "dotenv/config";
import * as joi from "joi";

interface invConfig {
  APP_PORT: number;
  DATABASE_URL: string;
  PAGINATION_DEFAULT_PAGE: number;
  PAGINATION_DEFAULT_LIMIT: number;
}

const envsSchema = joi
  .object({
    APP_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PAGINATION_DEFAULT_PAGE: joi.number().default(1),
    PAGINATION_DEFAULT_LIMIT: joi.number().default(10),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config: invConfig = value;

export const envs = {
  APP_PORT: config.APP_PORT,
  DATABASE_URL: config.DATABASE_URL,
  PAGINATION_DEFAULT_PAGE: config.PAGINATION_DEFAULT_PAGE,
  PAGINATION_DEFAULT_LIMIT: config.PAGINATION_DEFAULT_LIMIT,
};
