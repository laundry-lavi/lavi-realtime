import { FastifyInstance } from "fastify";

export async function socketIoServer(app: FastifyInstance) {
	app.io.on("connection", (socket) => {
		console.log("Novo cliente conectado:", socket.id);

		socket.on("mensagem", (mensagem) => {
			console.log("Recebeu", mensagem);

			// Envia de volta para o cliente (ou para todos, se quiser)
			app.io.emit("resposta", `Servidor recebeu: ${mensagem}`);
		});
	});
}
