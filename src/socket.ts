import { FastifyInstance } from "fastify";
import { logger } from "./log/logger";

export async function socketIoServer(app: FastifyInstance) {
  app.io.on("connection", (socket) => {
    logger.info(`New socket connected: ${socket.id}`);

    socket.on("mensagem", (mensagem) => {
      console.log("Recebeu", mensagem);

      // Envia de volta para o cliente (ou para todos, se quiser)
      app.io.emit("resposta", `Servidor recebeu: ${mensagem}`);
    });
  });
}
