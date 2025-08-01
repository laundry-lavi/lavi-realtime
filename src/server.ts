import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { socketIoServer } from "./socket";
import { router } from "./router";

import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { logger } from "./log/logger";
import { db } from "./db/drizzle";
import { verify_env } from "./config";

export const app = Fastify();

const run = async () => {
  verify_env();

  await app.register(fastifySocketIO);
  logger.info("Testing database connection...");
  await db.execute("SELECT 1");
  logger.info("Database connection ok.");

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(async (app, _) => {
    app.addHook("onReady", (done) => {
      socketIoServer(app);
      logger.info("Socket-IO initialized.");
      done();
    });
  });

  app.register(router);

  const PORT = process.env.PORT ? process.env.PORT : "7750";

  app.listen({ port: Number(PORT) }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    logger.info(`Server running at: ${address}`);
  });
};

run();
