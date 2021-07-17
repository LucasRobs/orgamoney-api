import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import Month from './Month';

@Entity()
export default class Year {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
