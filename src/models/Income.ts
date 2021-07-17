import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Category from './Category';

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

  category: Category;
}
