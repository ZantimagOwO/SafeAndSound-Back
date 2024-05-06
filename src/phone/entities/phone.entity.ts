import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Call } from '../../call/entities/call.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  Phone_ID: number;

  @Column()
  Phone: string;

  @OneToMany(() => Call, (call) => call.Phone)
  Calls: Call[];

  @OneToMany(() => User, (user) => user.Phone)
  Owner: User;

  @ManyToMany(() => User, (user) => user.Protectors)
  Protected: User[];
}
