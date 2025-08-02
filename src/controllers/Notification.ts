import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../server";

export class NotificationController {
  public async SendToAll(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { title, content } = req.body as any;

    app.io.emit("messageToAll", { title, content });
    return reply.code(201).send("Mensagem enviada");
  }

  public async SendToOne(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { title, content, id, type } = req.body as any;

    const allSockets = await app.io.fetchSockets();

    for (const socket of allSockets) {
      if (socket.data.id == id || socket.id == id) {
        reply.code(204).send("Enviando notificação...");
        socket.emit("privateNotification", { title, content, type });
        return;
      }
    }

    // socket não encontrado
    return reply.code(404).send("Socket not found.");
  }
}
