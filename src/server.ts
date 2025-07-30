import Fastify from "fastify";
import fastifySocketIO from "fastify-socket.io";
import { socketIoServer } from "./socket";

const app = Fastify({
  logger: true,
});

const run = async () => {
  await app.register(fastifySocketIO);

  app.get("/", async () => {
    return { hello: "world " };
  });

  app.register(async (app, _) => {
    app.addHook("onReady", (done) => {
      socketIoServer(app);
      done();
    });
  });

  app.listen({ port: 7750 }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    console.log(`Server running: ${address}`);
  });
};

run();
