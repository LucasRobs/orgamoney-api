/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const repositoryCategory = getRepository(Category);
    const category = new Category();
    category.name = request.body.name;
    repositoryCategory.save(category);
    return response.status(200).json(category);
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
