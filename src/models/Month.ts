import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bill from './Bill';
import Income from './Income';
import Year from './Year';

@Entity()
export default class Month {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Year, year => year.months)
  @JoinColumn()
  year: Year;

  @OneToMany(() => Income, income => income.month, {
    lazy: true,
    cascade: true,
  })
  @JoinColumn()
  incomes: Income[];

  @OneToMany(() => Bill, bill => bill.month, { lazy: true, cascade: true })
  @JoinColumn()
  bills: Bill[];

  constructor(name: string) {
    this.name = name;
  }
}
