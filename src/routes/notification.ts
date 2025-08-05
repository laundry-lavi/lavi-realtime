import { FastifyInstance } from "fastify";
import z from "zod";
import { NotificationController } from "../controllers/Notification";

const notifyAllSchema = {
  schema: {
    summary: "Notificação para todos",
    tags: ["notification"],
    body: z.object({
      title: z.string(),
      content: z.string(),
      type: z.string(),
    }),
    response: {
      201: z.string(),
    },
  },
};

const notifyOneClient = {
  schema: {
    summary: "Para apenas um dispositivo",
    tags: ["notification"],
    body: z.object({
      id: z
        .string()
        .describe("O id do socket ou o id do usuário no banco de dados"),
      title: z.string(),
      content: z.string(),
      type: z.string(),
    }),
    response: {
      201: z.string(),
    },
  },
};

export const notify_Router = (app: FastifyInstance) => {
  const controller = new NotificationController();

  app.put("/all", notifyAllSchema, controller.SendToAll);
  app.put("/one-client", notifyOneClient, controller.SendToOne);
};
