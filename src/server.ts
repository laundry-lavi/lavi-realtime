import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { socketIoServer } from "./socket";
import { router } from "./routes/index";

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { logger } from "./log/logger";
import fastifySwagger from "@fastify/swagger";

import { verify_env } from "./config";
import { connectDB } from "./db/mongodb/index";

export const app = Fastify();

app.register(fastifySocketIO);

// @ts-ignore
app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Laví Realtime service",
      description: "A socket.io based service",
    },
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  transform: jsonSchemaTransform,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.addHook("onReady", (done) => {
  logger.info("Loading socket.io...");
  try {
    socketIoServer(app);
  } catch (error) {
    logger.fatal(error);
  }
  logger.info("socket.io loaded with success.");
  done();
});

app.register(router);

const run = async () => {
  verify_env();

  logger.info("Connecting to MongoDb...");
  connectDB();
  logger.info("MongoDb connection Ok!");

  // Setup for scalar api reference
  await app.register(import("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
  });

  const PORT = process.env.PORT ? process.env.PORT : "7750";

  app.listen({ port: Number(PORT) }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    logger.info(`Server running at: ${address}`);
    logger.info("See API Reference at /docs");
  });
};

run();
