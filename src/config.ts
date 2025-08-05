import { logger } from "./log/logger";

const EnvConfig = new Map<string, string>(
  Object.entries(process.env).filter(
    (entry): entry is [string, string] => entry[1] !== undefined
  )
);

const vars = ["MONGO_URL"];

export const verify_env = () => {
  const missingVars = vars.filter((v) => !EnvConfig.has(v));
  if (missingVars.length) {
    logger.fatal(`Missing env vars: ${missingVars.join(", ")}`);
    process.exit(1);
  }
};

export default EnvConfig;
