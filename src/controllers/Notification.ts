import { FastifyReply, FastifyRequest } from "fastify";
import { EmitToAll, FindSocketById } from "../functions/io-server-utils";

export class NotificationController {
  public async SendToAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { title, content } = req.body as any;

    /* app.io.emit("messageToAll", { title, content }); */
    EmitToAll("notificationToAll", { title, content });
    return reply.code(201).send("Mensagem enviada");
  }

  public async SendToOne(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { title, content, id, type } = req.body as any;

    const response = await FindSocketById(id);

    if (!response.data) {
      return reply.code(404).send("Socket not found!");
    }

    reply.code(204).send();
    response.data.emit("privateNotification", { title, content, type });
  }
}
