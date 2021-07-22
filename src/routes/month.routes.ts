/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  try {
    const Authorization = request.headers.authorization;
    const repositoryUser = getRepository(User);
    const user = await repositoryUser.findOne({
      where: { id: Authorization },
    });
    if (user) {
      user.years[0].months.forEach(month => {
        if (request.body.month === month.name)
          return response.status(200).json(month);
      });
      return response.status(404).send('Mês não encontrado.');
    }
    return response.status(401).send('Falha de Autenticação.');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
