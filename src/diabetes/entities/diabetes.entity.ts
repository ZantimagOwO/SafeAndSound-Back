import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Diabetes {
  @PrimaryGeneratedColumn()
  Diabetes_ID: number;

  @Column()
  Diabetes: string

  @OneToMany(() => User, (user) => user.Diabetes)
  users: User[];
}
