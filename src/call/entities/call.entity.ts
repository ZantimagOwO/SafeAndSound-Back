import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ailment } from '../../ailment/entities/ailment.entity';
import { Alergy } from '../../alergy/entities/alergy.entity';
import { Phone } from '../../phone/entities/phone.entity';

@Entity()
export class Call {
  @PrimaryGeneratedColumn()
  Call_ID: number;

  @Column()
  Phone_Called: string;

  @Column()
  Date: Date;

  @Column()
  Latitude: number;

  @Column()
  Longitude: number;

  

  @ManyToMany(() => Alergy)
  @JoinTable()
  Alergies: Alergy[];

  @ManyToMany(() => Ailment)
  @JoinTable()
  Ailments: Ailment[];

  @ManyToMany(() => Phone)
  @JoinTable()
  Alerted: Phone[];

  @ManyToOne(() => Phone, (phone) => phone.Calls)
  Phone: Phone;
}
