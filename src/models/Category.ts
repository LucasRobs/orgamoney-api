import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;
}
