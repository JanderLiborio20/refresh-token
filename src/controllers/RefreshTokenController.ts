import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RefreshToken } from '../lib/RefreshToken';

export class RefreshTokenController {
  static schema = z.object({
    refreshToken: z.string().min(1),
  });

  static handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = this.schema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({ errors: result.error.issues });
    }

    const { refreshToken } = result.data;

    RefreshToken.validate(refreshToken);

    return reply.send({ token: refreshToken });
  };
}
