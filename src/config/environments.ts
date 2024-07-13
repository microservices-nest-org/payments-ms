import 'dotenv/config';
import * as joi from 'joi';

interface IEnvsVars {
  PORT: number;
  STRIPE_SECRET_KEY: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
}

const envsSchema = joi
  .object<IEnvsVars>({
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvsVars = value;

export const envs = {
  port: envsVars.PORT,
  stripeSecretKey: envsVars.STRIPE_SECRET_KEY,
  stripeSuccessUrl: envsVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envsVars.STRIPE_CANCEL_URL,
};
