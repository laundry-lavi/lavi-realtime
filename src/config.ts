import { logger } from "./log/logger";

const EnvConfig = new Map<string, string>(
  Object.entries(process.env).filter(
    (entry): entry is [string, string] => entry[1] !== undefined
  )
);

const vars = ["DATABASE_URL"];

export const verify_env = () => {
  const missingVars = vars.filter((v) => !EnvConfig.has(v));
  if (missingVars.length) {
    logger.fatal(`Missing env vars: ${missingVars.join(", ")}`);
  }
};

export default EnvConfig;

