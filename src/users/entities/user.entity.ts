import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodType } from '../../blood_type/entities/blood_type.entity';
import { Button } from '../../button/entities/button.entity';
import { Alergy } from '../../alergy/entities/alergy.entity';
import { Ailment } from '../../ailment/entities/ailment.entity';
import { Phone } from '../../phone/entities/phone.entity';
import { Diabetes } from '../../diabetes/entities/diabetes.entity';
import * as CryptoJS from 'crypto-js';

const secretKey: string = '].uW?yy(`rJv85xmb6s)4_2*y2MXAf';

const iv : string = CryptoJS.enc.Hex.parse('78ACDA6786CAC6876456ACF');

export const encryptDecryptTransformer = {
  to: (value: string) => {
    return CryptoJS.MD5(value).toString();
  },
  from: (value: string) => {
    return value
  },
};

@Entity()
export class User {


  static readonly BLOOD_GROUP_TYPES = ['A', 'B', 'AB', 'O'];

  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column({ unique: true, nullable: false })
  DNI: string;

  @Column()
  Username: string;

  @Column()
  Name: string;

  @Column()
  Surname: string;

  @Column({
    transformer: encryptDecryptTransformer,
  })
  Password: string;

  @Column({ nullable: true })
  diaNac: number;

  @Column({ nullable: true })
  mesNac: number;

  @Column({ nullable: true })
  anyoNac: number;

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
    bType.Blood_Group = User.BLOOD_GROUP_TYPES[json.Blood_Group];
    bType.RH = json.RH;
    user.Blood_Type = bType;

    console.log('bg found: ' + JSON.stringify(bType));

    if (json.Phone) {
      let p = new Phone();
      p.Phone = json.Phone;
      user.Phone = p;
    }

    if (json.Diabetes != 4) {
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

    user.diaNac = json.dia;
    user.mesNac = json.mes;
    user.anyoNac = json.anyo;

    return user;
  }
}
