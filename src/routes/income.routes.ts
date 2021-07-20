/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import Income from '../models/Income';
import Month from '../models/Month';
import User from '../models/User';

const userRouter = Router();

async function getMonth(userId, nameMonth) {
  try {
    const repositoryUser = getRepository(User);
    const user = await repositoryUser.findOne({
      where: { id: userId },
    });
    let res = null;
    if (user) {
      user.years[0].months.forEach(month => {
        if (nameMonth === month.name) {
          res = month;
        }
      });
    }
    return res;
  } catch (err) {
    return err;
  }
}

userRouter.post('/', async (request, response) => {
  try {
    const req = request.body;
    const repositoryCategory = getRepository(Category);
    const category = await repositoryCategory.findOne({
      where: { name: req.category },
    });
    const month = await getMonth(req.userId, req.month);
    if (category && month) {
      const income = new Income();
      income.category = category;
      income.name = req.name;
      income.value = req.value;
      income.date = new Date();
      const repositoryIncome = getRepository(Income);
      await repositoryIncome.save(income);
      month.incomes.push(income);
      const repositoryMonth = getRepository(Month);
      await repositoryMonth.save(month);
      return response.status(200).json(income);
    }
    if (!category)
      return response.status(404).send('categoria não encontrada.');
    if (!month) return response.status(404).send('mês não encontrado.');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
