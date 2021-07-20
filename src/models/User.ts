import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Year from './Year';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Year, year => year.user, { eager: true, cascade: true })
  @JoinColumn()
  years: Year[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  constructor(nome: string, login: string, password: string) {
    this.name = nome;
    this.login = login;
    this.password = password;
  }
}
