import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Month from './Month';
import User from './User';

@Entity()
export default class Year {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: number;

  @ManyToOne(() => User, user => user.years)
  @JoinColumn()
  user: User;

  @OneToMany(() => Month, month => month.year, { lazy: true, cascade: true })
  @JoinColumn()
  months: Month[];

  constructor(name: number) {
    this.name = name;
  }
}
