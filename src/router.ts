import { FastifyInstance } from "fastify";
import { MessageController } from "./controllers/Messages";

export const router = (app: FastifyInstance) => {
  const messageController = new MessageController();

  app.put("/notify/all", messageController.SendToAll);
  app.put("/notify/on-client/", messageController.SendToOne);
};
