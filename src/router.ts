import { FastifyInstance } from "fastify";
import { MessageController } from "./controllers/Messages";
import { logger } from "./log/logger";

export const router = (app: FastifyInstance) => {
  const messageController = new MessageController();

  app.get("/", (_, reply) => {
    return reply.code(200).send("Realtime API running, go to /docs");
  });

  app.put("/notify/all", messageController.SendToAll);
  app.put("/notify/on-client/", messageController.SendToOne);
  logger.info("Routes defined.");
};
