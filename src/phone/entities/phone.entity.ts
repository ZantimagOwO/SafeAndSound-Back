import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Call } from '../../call/entities/call.entity';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  Phone_ID: number;

  @Column()
  Phone: string;

  @OneToMany(() => Call, (call) => call.Phone)
  Calls: Call[];
}
