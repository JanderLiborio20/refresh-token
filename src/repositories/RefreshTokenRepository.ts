import { prismaClient } from '../lib/prisma';

interface ICreateDTO {
  accountId: string;
  token: string;
}

export class RefreshTokenRepository {
  static create({ accountId, token }: ICreateDTO) {
    return prismaClient.refreshToken.create({
      data: {
        accountId,
        token,
      },
    });
  }
}
