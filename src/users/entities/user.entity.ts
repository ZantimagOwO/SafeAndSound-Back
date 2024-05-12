import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BloodType } from "../../blood_type/entities/blood_type.entity";
import { Button } from "../../button/entities/button.entity";
import { Alergy } from "../../alergy/entities/alergy.entity";
import { Ailment } from '../../ailment/entities/ailment.entity';
import { Phone } from "../../phone/entities/phone.entity";
import { Diabetes } from "../../diabetes/entities/diabetes.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column({ nullable: true })
  DNI: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Surname: string;

  @Column()
  Password: string;

  @OneToOne(() => Phone, (phone) => phone.Owner)
  @JoinColumn()
  Phone: Phone;

  @ManyToOne(() => BloodType, (bloodType) => bloodType.users)
  Blood_Type: BloodType;

  @ManyToOne(() => Diabetes, (diabetes) => diabetes.users)
  Diabetes: Diabetes;

  @OneToMany(() => Button, (button) => button.User)
  Buttons: Button[];

  @ManyToMany(() => Alergy, { cascade: true })
  @JoinTable()
  Alergies: Alergy[];

  @ManyToMany(() => Ailment, { cascade: true })
  @JoinTable()
  Ailments: Ailment[];

  @ManyToMany(() => Phone, (phone) => phone.Protected)
  @JoinTable()
  Protectors: Phone[];

  public static jsonToUser(json: any): User {
    let user = new User();
    user.DNI = json.DNI;
    user.Name = json.Name;
    user.Surname = json.Surname;
    user.Username = json.Username;
    user.Password = json.Password;

    let bType = new BloodType();
    bType.Blood_Group = json.Blood_Group;
    bType.RH = json.RH;
    user.Blood_Type = bType;

    if (json.Phone) {
      let p = new Phone();
      p.Phone = json.Phone;
      user.Phone = p;
    }

    if (json.Diabetes != '4') {
      let d = new Diabetes();
      d.Diabetes_ID = json.Diabetes;
      user.Diabetes = d;
    }

    let ailments: Ailment[] = [];
    if (json.Ailments.length > 0) {
      json.Ailments.forEach((str) => {
        let ailment = new Ailment();
        ailment.Ailment = str;
        ailments.push(ailment);
      });
    }
    user.Ailments = ailments;

    let alergies: Alergy[] = [];
    if (json.Alergies.length > 0) {
      json.Alergies.forEach((str) => {
        let alergy = new Alergy();
        alergy.Alergy = str;
        alergies.push(alergy);
      });
    }
    user.Alergies = alergies;

    return user;
  }
}
