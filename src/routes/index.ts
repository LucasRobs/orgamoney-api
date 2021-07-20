import { Router } from 'express';
import userRouter from './user.routes';
import yearRouter from './year.routes';
import monthRouter from './month.routes';
import billRouter from './bill.routes';
import incomeRouter from './income.routes';
import categoryRouter from './category.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/year', yearRouter);
routes.use('/month', monthRouter);
routes.use('/bill', billRouter);
routes.use('/income', incomeRouter);
routes.use('/category', categoryRouter);

export default routes;
