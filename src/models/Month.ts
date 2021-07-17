import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import Bill from './Bill';
import Income from './Income';

@Entity()
export default class Month {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  incomes: Income;

  bills: Bill;
}
