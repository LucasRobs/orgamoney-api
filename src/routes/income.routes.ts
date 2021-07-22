/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import Income from '../models/Income';
import Month from '../models/Month';
import User from '../models/User';

const userRouter = Router();

async function getMonth(
  userId: string | undefined,
  nameMonth: string,
): Promise<Month | null> {
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

async function getCategory(
  userId: string | undefined,
  nameCategory: string,
): Promise<Category | null> {
  try {
    const repositoryUser = getRepository(User);
    const user = await repositoryUser.findOne({
      where: { id: userId },
    });
    let res = null;
    if (user) {
      user.categories.forEach(category => {
        if (nameCategory === category.name) {
          res = category;
        }
      });
    }
    return res;
  } catch (err) {
    return err;
  }
}

function createIncome(
  name: string,
  value: number,
  date: string,
  category: Category,
): Income {
  const income = new Income();
  income.category = category;
  income.name = name;
  income.value = value;
  income.date = new Date(date);
  return income;
}

userRouter.post('/', async (request, response) => {
  try {
    const Authorization = request.headers.authorization;
    const { name, value, date, idMonth, idCategory } = request.body;
    const category = await getCategory(Authorization, idCategory);
    const month = await getMonth(Authorization, idMonth);
    if (category && month) {
      const income = createIncome(name, value, date, category);
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

userRouter.delete('/', async (request, response) => {
  try {
    const { idMonth, idIncome } = request.body;
    const Authorization = request.headers.authorization;
    const month = await getMonth(Authorization, idMonth);
    if (month) {
      const repositoryIncome = getRepository(Income);
      const income = month.incomes.find((incomee): Income | undefined => {
        if (incomee.id === idIncome) return incomee;
      });

      if (income) {
        await repositoryIncome.delete(income);
        const repositoryMonth = getRepository(Month);
        month.incomes = month.incomes.filter(incomel => {
          return income !== incomel;
        });
        await repositoryMonth.save(month);
        return response.status(200).send('Renda deletada!');
      }
      return response.status(404).send('Conta não encontrado!');
    }
    return response.status(404).send('Mês não encontrado!');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

userRouter.patch('/', async (request, response) => {
  try {
    const { name, value, date, idIncome, idMonth, idCategory } = request.body;
    const Authorization = request.headers.authorization;
    const category = await getCategory(Authorization, idCategory);
    const month = await getMonth(Authorization, idMonth);
    if (month) {
      const repositoryIncome = getRepository(Income);
      const income = month.incomes.find((incomee): Income | undefined => {
        if (incomee.id === idIncome) return incomee;
      });

      if (income && category) {
        income.name = name;
        income.value = value;
        income.date = date;
        income.category = category;
        await repositoryIncome.save(income);
        return response.status(200).send('Conta atualizada!');
      }
      if (!income) return response.status(404).send('Conta não encontrado!');
      if (!category)
        return response.status(404).send('Categoria não encontrado!');
    }
    return response.status(404).send('Mês não encontrado!');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
