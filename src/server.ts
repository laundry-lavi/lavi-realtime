import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { socketIoServer } from "./socket";
import { router } from "./router";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { logger } from "./log/logger";
import fastifySwagger from "@fastify/swagger";

export const app = Fastify();

app.register(fastifySocketIO);

// @ts-ignore
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Laví Realtime service",
      description: "A socket.io based service"
    }
  },
  transform: jsonSchemaTransform
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.addHook("onReady", (done) => {
  logger.info("Loading socket.io...")
  try { socketIoServer(app) }
  catch (error) {
    logger.fatal(error);
  }
  logger.info("socket.io loaded with success.")
  done();
});


app.register(router);

const run = async () => {
  /*   verify_env();
  
    await app.register(fastifySocketIO);
    logger.info("Testing database connection...");
    await db.execute("SELECT 1");
    logger.info("Database connection ok."); */


  // Setup for scalar api reference  
  await app.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/docs',
  })

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
