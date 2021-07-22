/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import User from '../models/User';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const Authorization = request.headers.authorization;
    const repositoryUser = getRepository(User);
    const user = await repositoryUser.findOne({ where: { id: Authorization } });
    if (user) {
      const repositoryCategory = getRepository(Category);
      const category = new Category();
      category.name = request.body.name;
      await repositoryCategory.save(category);
      user.categories.push(category);
      await repositoryUser.save(user);
      return response.status(200).json(category);
    }
    return response.status(401).send('Falha de Autenticação.');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
