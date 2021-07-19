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
export default class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  value: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Month, month => month.bills)
  @JoinColumn()
  month: Month;

  @OneToOne(() => Category, { lazy: true, cascade: true })
  @JoinColumn()
  category: Category;
}
