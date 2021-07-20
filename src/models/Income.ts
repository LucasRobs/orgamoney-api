import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn()
  category: Category;
}
