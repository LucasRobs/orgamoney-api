import { Router } from 'express';
import { getRepository } from 'typeorm';
import Month from '../models/Month';
import User from '../models/User';
import Year from '../models/Year';

async function createMonth(): Promise<Month[]> {
  const repositoryMonth = getRepository(Month);
  const months = [
    new Month('Janeiro'),
    new Month('Feveiro'),
    new Month('Março'),
    new Month('Abril'),
    new Month('Maio'),
    new Month('Junho'),
    new Month('Julho'),
    new Month('Agosto'),
    new Month('Setenbro'),
    new Month('Outubro'),
    new Month('Novenbro'),
    new Month('Dezenbro'),
  ];

  months.forEach(async month => {
    await repositoryMonth.save(month);
  });

  return months;
}

const userRouter = Router();

userRouter.post('/session', async (request, response) => {
  try {
    const repository = getRepository(User);
    const user = await repository.findOne({
      where: { login: request.body.login, password: request.body.password },
    });
    if (user) {
      return response.status(200).json(user);
    }
    return response.status(401).send('login ou senha invalido');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

userRouter.post('/', async (request, response) => {
  try {
    const repositoryYear = getRepository(Year);
    const repositoryUser = getRepository(User);

    const year = new Year(2020);
    await repositoryYear.save(year);

    year.months = await createMonth();

    const { body } = request;
    const user = new User(body.name, body.login, body.password);
    user.years = [year];

    const res = await repositoryUser.save(user);
    console.log(year);

    return response.status(201).send(res);
  } catch (err) {
    switch (err.constraint) {
      case 'UQ_a62473490b3e4578fd683235c5e':
        return response.status(401).send('Esse login ja esta em uso!');
      default:
        console.log(err.message);
    }
  }
});

export default userRouter;
