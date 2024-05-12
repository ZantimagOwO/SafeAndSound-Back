import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ailment {
  
  @PrimaryGeneratedColumn()
  Ailment_ID: number;

  @Column()
  Ailment: string;
}
