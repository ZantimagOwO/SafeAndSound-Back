import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class BloodType {
  @PrimaryGeneratedColumn()
  Blood_Type_ID: number;

  @Column()
  RH: string;

  @Column()
  Blood_Group: string;

  @OneToMany(() => User, (user) => user.Blood_Type)
  users: User[];
}
