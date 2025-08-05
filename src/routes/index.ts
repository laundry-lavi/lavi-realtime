import { FastifyInstance } from "fastify";
import { logger } from "../log/logger";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { notify_Router } from "./notification";

const defaultRoute = {
  schema: {
    summary: "Redirect to /docs",
  },
};

export const router = (server: FastifyInstance) => {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get("/", defaultRoute, (_, reply) => {
    reply.redirect("/docs");
  });

  app.register(notify_Router, { prefix: "/notify" });

  logger.info("Routes defined.");
};
