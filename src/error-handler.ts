import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { logger } from "./log/logger";

export class BadRequest extends Error {
  constructor(
    public readonly status: number,
    public readonly response: string
  ) {
    super(response);
  }
}

export class DatabaseError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const ServerErrorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Error during validating",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof DatabaseError) {
    logger.warn(error);
    return reply.status(500).send({
      message: "Database error, contact system administrator",
    });
  }

  if (error instanceof BadRequest) {
    return reply.status(error.status).send({
      details: error.message,
    });
  }

  return reply.status(500).send(error);
};
