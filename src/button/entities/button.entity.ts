import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.Buttons, {eager: true})
  User: User;

  @ManyToMany(() => Phone, (phone) => phone.UsedBy, {eager: true})
  @JoinTable()
  Phones: Phone[];

  @Column()
  Color: string;

  public static jsonToButton(json: any): Button {

//     {
//   userID: 48,
//   nombreBoton: '',
//   telefonoEmergencia: '',
//   mensajeEmergenciaNumero: '',
//   mensajeEmergenciaProtectores: '',
//   selectedColor: '#DC6154',
//   protectores: [ 2, 54 ]
// }

    let b: Button = new Button();

    if(json.userID){
      let u = new User()
      u.User_ID = json.userID
      b.User = u
    }

    b.Button_ID = json.buttonID
    b.Button_Name = json.nombreBoton;
    b.Color = json.selectedColor;
    b.Emergency_Message = json.mensajeEmergenciaNumero;
    b.Protector_Message = json.mensajeEmergenciaProtectores;
    b.Button_Tlf = json.telefonoEmergencia;

    let protectores = []

    for (let i = 0; i < json.protectores.length; i++) {

      let p = new Phone();
      p.Phone_ID = json.protectores[i]

      protectores.push(p)
    }

    b.Phones = protectores

    return b;
  }

}

