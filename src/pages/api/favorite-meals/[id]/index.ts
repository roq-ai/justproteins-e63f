import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { favoriteMealValidationSchema } from 'validationSchema/favorite-meals';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.favorite_meal
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFavoriteMealById();
    case 'PUT':
      return updateFavoriteMealById();
    case 'DELETE':
      return deleteFavoriteMealById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFavoriteMealById() {
    const data = await prisma.favorite_meal.findFirst(convertQueryToPrismaUtil(req.query, 'favorite_meal'));
    return res.status(200).json(data);
  }

  async function updateFavoriteMealById() {
    await favoriteMealValidationSchema.validate(req.body);
    const data = await prisma.favorite_meal.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFavoriteMealById() {
    const data = await prisma.favorite_meal.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
