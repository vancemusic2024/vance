import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../prisma";

export function webhookRoutes(fastify: FastifyInstance) {
  // Create a new webhook
  fastify.post(
    "/api/v1/webhook/create",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, url, type, active, secret }: any = request.body;

      await prisma.webhooks.create({
        data: {
          name,
          url,
          type,
          active,
          secret,
          createdBy: session.user.email,
        },
      });

      reply.status(200).send({ message: "Hook created!", success: true });
    }
  );

  // Get all webhooks
  fastify.get(
    "/api/v1/webhooks/all",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const webhooks = await prisma.webhooks.findMany({});

      reply.status(200).send({ webhooks: webhooks, success: true });
    }
  );

  // Delete a webhook

  fastify.delete(
    "/api/v1/webhook/delete/:id",

    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id }: any = request.params;
      await prisma.webhooks.delete({
        where: {
          id: id,
        },
      });

      reply.status(200).send({ success: true });
    }
  );
}
