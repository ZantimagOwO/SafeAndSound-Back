import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Phone } from '../../phone/entities/phone.entity';

@Entity()
export class Button {
  @PrimaryGeneratedColumn()
  Button_ID: number;

  @Column()
  Button_Name: string;

  @Column()
  Button_Tlf: string;

  @Column()
  Protector_Message: string;

  @Column()
  Emergency_Message: string;

  @ManyToOne(() => User, (user) => user.Buttons)
  User: User;

  @ManyToMany(() => Phone)
  Phones: Phone[];
  
}
