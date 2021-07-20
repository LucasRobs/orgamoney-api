/* eslint-disable consistent-return */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';
import Bill from '../models/Bill';
import Month from '../models/Month';
import User from '../models/User';

const userRouter = Router();

async function getMonth(
  userId: string,
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

userRouter.post('/', async (request, response) => {
  try {
    const req = request.body;
    const repositoryCategory = getRepository(Category);
    const category = await repositoryCategory.findOne({
      where: { name: req.category },
    });
    const month = await getMonth(req.userId, req.month);
    if (category && month) {
      const bill = new Bill();
      bill.category = category;
      bill.name = req.name;
      bill.value = req.value;
      bill.date = new Date();
      const repositoryBill = getRepository(Bill);
      await repositoryBill.save(bill);
      month.bills.push(bill);
      const repositoryMonth = getRepository(Month);
      await repositoryMonth.save(month);
      return response.status(200).json(bill);
    }
    if (!category)
      return response.status(404).send('categoria não encontrada.');
    if (!month) return response.status(404).send('mês não encontrado.');
  } catch (err) {
    return response.status(400).send(err.message);
  }
});

export default userRouter;
