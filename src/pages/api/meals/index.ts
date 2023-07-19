import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { mealValidationSchema } from 'validationSchema/meals';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getMeals();
    case 'POST':
      return createMeal();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMeals() {
    const data = await prisma.meal
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'meal'));
    return res.status(200).json(data);
  }

  async function createMeal() {
    await mealValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.favorite_meal?.length > 0) {
      const create_favorite_meal = body.favorite_meal;
      body.favorite_meal = {
        create: create_favorite_meal,
      };
    } else {
      delete body.favorite_meal;
    }
    if (body?.product?.length > 0) {
      const create_product = body.product;
      body.product = {
        create: create_product,
      };
    } else {
      delete body.product;
    }
    const data = await prisma.meal.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
