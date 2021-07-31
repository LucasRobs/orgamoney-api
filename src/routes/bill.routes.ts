/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import Bill from '../models/Bill';
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

function createBill(
  name: string,
  value: number,
  date: string,
  category: Category,
): Bill {
  const bill = new Bill();
  bill.category = category;
  bill.name = name;
  bill.value = value;
  bill.date = new Date(date);
  return bill;
}

userRouter.post('/', async (request, response) => {
  try {
    const { name, value, date, idMonth, idCategory } = request.body;
    const Authorization = request.headers.authorization;
    const category = await getCategory(Authorization, idCategory);
    const month = await getMonth(Authorization, idMonth);
    if (category && month) {
      const repositoryBill = getRepository(Bill);
      const bill = createBill(name, value, date, category);
      await repositoryBill.save(bill);
      month.bills.push(bill);
      const repositoryMonth = getRepository(Month);
      await repositoryMonth.save(month);
      return response.status(200).json(bill);
    }
    if (!month) return response.status(404).send('mês não encontrado.');
    if (!category)
      return response.status(404).send('categoria não encontrada.');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

userRouter.delete('/', async (request, response) => {
  try {
    const { nameMonth, idBill } = request.query;
    const Authorization = request.headers.authorization;
    const month = await getMonth(Authorization, String(nameMonth));
    if (month) {
      const repositoryBill = getRepository(Bill);
      const bill = month.bills.find((billl): Bill | undefined => {
        if (billl.id === String(idBill)) return billl;
      });

      if (bill) {
        await repositoryBill.delete(bill);
        const repositoryMonth = getRepository(Month);
        month.bills = month.bills.filter(billl => {
          return bill !== billl;
        });
        await repositoryMonth.save(month);
        return response.status(200).send('Conta deletada!');
      }
      return response.status(404).send('Conta não encontrado!');
    }
    return response.status(404).send('Mês não encontrado!');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

userRouter.put('/', async (request, response) => {
  try {
    const { name, value, date, idBill, idMonth, idCategory } = request.body;
    const Authorization = request.headers.authorization;
    const category = await getCategory(Authorization, idCategory);
    const month = await getMonth(Authorization, idMonth);
    if (month) {
      const repositoryBill = getRepository(Bill);
      const bill = month.bills.find((billl): Bill | undefined => {
        if (billl.id === idBill) return billl;
      });
      if (bill && category) {
        bill.name = name;
        bill.value = value;
        bill.date = date;
        bill.category = category;
        await repositoryBill.save(bill);
        return response.status(200).send('Conta atualizada!');
      }
      if (!bill) return response.status(404).send('Conta não encontrado!');
      if (!category)
        return response.status(404).send('Categoria não encontrado!');
    }
    return response.status(404).send('Mês não encontrado!');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
