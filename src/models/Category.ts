import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.categories)
  user: User;
}
