import { Ailment } from './../ailment/entities/ailment.entity';
import { Phone } from './../phone/entities/phone.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Alergy } from '../alergy/entities/alergy.entity';
import { BloodType } from '../blood_type/entities/blood_type.entity';
import { Diabetes } from '../diabetes/entities/diabetes.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    @InjectRepository(BloodType)
    private bloodTypeRepository: Repository<BloodType>,
    @InjectRepository(Diabetes)
    private diabetesRepository: Repository<Diabetes>,
  ) {}

  async create(user: User) {
    let phone = await this.phoneRepository.findOneBy({
      Phone: user.Phone.Phone,
    });
    if (phone !== null) {
      return 'Telefono ya registrado';
    }

    let dniExists = await this.userRepository.exists({ where : {DNI: user.DNI} });

    if(dniExists) {
      return "Ya existe un usuario con ese DNI"
    }

    phone = new Phone();
    phone.Phone = user.Phone.Phone;
    await this.phoneRepository.save(phone);
    user.Phone = phone;

    let bType = await this.bloodTypeRepository.findOneBy({
      Blood_Group: user.Blood_Type.Blood_Group,
      RH: user.Blood_Type.RH,
    });
    user.Blood_Type = bType;

    console.log("blood type: " + JSON.stringify(user.Blood_Type))

    if(user.Diabetes != null){
    let diabetes = await this.diabetesRepository.findOneBy({Diabetes_ID: user.Diabetes.Diabetes_ID})
    user.Diabetes = diabetes
    }
  
    console.log('creando usuario: ' + JSON.stringify(user));

    await this.userRepository.save(user);
    console.log('usuario registrado correctamente');
    return 'usuario registrado correctamente';

  }

  async addProtector(User_ID: number, phone: string) {

    // Buscar si el teléfono ya existe en la base de datos
    let existingPhone = await this.phoneRepository.findOne({
      where: { Phone: phone },
    });

    if (existingPhone === null || existingPhone === undefined) {
      let p = new Phone();
      p.Phone = phone;

      existingPhone = await this.phoneRepository.save(p);
    }

    let user = await this.userRepository.findOne({
      where: { User_ID: User_ID },
      relations: ['Protectors'],
    });

    if(user === null || user === undefined) {
      return "No existe ese usuario"
    }

    if(user.Protectors.includes(existingPhone)) {
          return "<div style='color:red;width:100%;height:100%;display:flex;justify-content:center;align-items:center;font-size:50px;'>Ya eres protector de este usuario!<div>";

    }

    user.Protectors.push(existingPhone);

    console.log("Protegidos post-add: " + user.Protectors)

    this.userRepository.save(user);
    this.phoneRepository.save(existingPhone);

    return "<div style='color:green;width:100%;height:100%;display:flex;justify-content:center;align-items:center;font-size:50px;'>Protector añadido con éxito!<div>";
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findProtected(user_id: number) {

    // Cual es mi telefono?
    let userLogueado = await this.userRepository.findOne({
      where: { User_ID: user_id },
      relations: ['Phone'],
    })

    let phone = userLogueado.Phone;

    // Qué usuarios avisaran a ese telefono al presionar el boton?
    let usuarioProtegidos = await this.userRepository.find({
      where: { Protectors: { Phone: phone.Phone } },
      relations: ['Protectors', 'Phone'],
    })

    // Cuales son sus telefonos?
    let resp = usuarioProtegidos.map(u => u.Phone)

    return resp;

  }

  async findProtectors(id: number) {
    const res = await this.userRepository.find({
      relations: ['Protectors'],
      where: { User_ID: id },
    });

    console.log(res);

    return res[0].Protectors;
  }

  async removeProtector(id: number, phoneNumber: string) {
    let user = await this.userRepository.findOne({
      where: { User_ID: id },
      relations: ['Protectors'],
    });

    let phone = await this.phoneRepository.findOne({
      where: { Phone: phoneNumber },
    });

    user.Protectors = user.Protectors.filter((p) => p.Phone !== phone.Phone);

    console.log("protectores después de borrado: " + user.Protectors)

    this.userRepository.save(user);

    return 1;
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Username: username, Password: password },
      relations: ['Phone', 'Ailments', 'Alergies', 'Blood_Type', 'Diabetes'],
    });

    console.log(user);

    if (!user) {
      return null;
    }
    
    user.Password = null;
    return user;
    
  }

  async update(user: User) {

    let phone = await this.phoneRepository.findOneBy({
      Phone: user.Phone.Phone,
    });

    if (phone === null || phone === undefined) {
      let p = new Phone();
      p.Phone = user.Phone.Phone;

      phone = await this.phoneRepository.save(p);
    }

    let tempUser = await this.userRepository.findOneBy({DNI: user.DNI});
    if(user == null){
      return "No hay ningun usuario con ese DNI"
    }
    user.User_ID = tempUser.User_ID;

    phone = new Phone();
    phone.Phone = user.Phone.Phone;
    await this.phoneRepository.save(phone);
    user.Phone = phone;

    let bType = await this.bloodTypeRepository.findOneBy({
      Blood_Group: user.Blood_Type.Blood_Group,
      RH: user.Blood_Type.RH,
    });
    user.Blood_Type = bType;

    if (user.Diabetes != null) {
      let diabetes = await this.diabetesRepository.findOneBy({
        Diabetes_ID: user.Diabetes.Diabetes_ID,
      });
      user.Diabetes = diabetes;
    }

    console.log("old user: " + JSON.stringify(user))
    let newUser = await this.userRepository.save(user);
    console.log("new user: " + JSON.stringify(newUser))
    return "usuario actualizado correctamente"
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
