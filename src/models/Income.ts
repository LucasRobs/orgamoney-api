import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './Category';
import Month from './Month';

@Entity()
export default class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  value: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Month, month => month.incomes)
  @JoinColumn()
  month: Month;

  @OneToOne(() => Category, { lazy: true, cascade: true })
  @JoinColumn()
  category: Category;
}
