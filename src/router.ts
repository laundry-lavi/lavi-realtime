import { FastifyInstance } from "fastify";
import { MessageController } from "./controllers/Messages";
import { logger } from "./log/logger";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import zod, { z } from 'zod';

const notifyAllSchema = {
  schema: {
    summary: 'Notificação para todos',
    tags: ['All'],
    body: zod.object({
      title: z.string(),
      content: zod.string()
    })
  }
}

export const router = (server: FastifyInstance) => {
  const app = server.withTypeProvider<ZodTypeProvider>();
  const messageController = new MessageController();

  app.get("/", (_, reply) => {
    return reply.code(200).send("Realtime API running, go to /docs");
  });

  app.put("/notify/all", notifyAllSchema, messageController.SendToAll);
  app.put("/notify/on-client/", messageController.SendToOne);
  logger.info("Routes defined.");
};
