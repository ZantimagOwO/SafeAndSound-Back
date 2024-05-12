import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alergy {
  @PrimaryGeneratedColumn()
  Alergy_ID: number;

  @Column()
  Alergy: string;
}
