import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BloodType } from "../../blood_type/entities/blood_type.entity";
import { Button } from "../../button/entities/button.entity";
import { Alergy } from "../../alergy/entities/alergy.entity";
import { Ailment } from "../../ailment/entities/ailment.entity";
import { Phone } from "../../phone/entities/phone.entity";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column('')
  DNI: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Surname: string;

  @Column()
  Password: string;

  // Photo
  @ManyToOne(() => BloodType, (bloodType) => bloodType.users)
  Blood_Type: BloodType;

  @OneToMany(() => Button, (button) => button.User)
  Buttons: Button[];

  @ManyToMany(() => Alergy)
  @JoinTable()
  Alergies: Alergy[];

  @ManyToMany(() => Ailment)
  @JoinTable()
  Ailments: Ailment[];

  @ManyToMany(() => Phone, phone => phone.Users)
  @JoinTable()
  Phones: Phone[];
}
