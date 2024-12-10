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

  static delete(token: string) {
    return prismaClient.refreshToken.deleteMany({
      where: {
        token,
      },
    });
  }

  static findByToken(token: string) {
    return prismaClient.refreshToken.findFirst({
      where: { token },
    });
  }

  static createDelete(refreshToken: string, accountId: string, token: string) {
    return prismaClient.$transaction(async (tsx) => {
      await Promise.all([
        tsx.refreshToken.deleteMany({
          where: {
            token: refreshToken,
          },
        }),
        tsx.refreshToken.create({
          data: {
            accountId,
            token,
          },
        }),
      ]);
    });
  }
}
