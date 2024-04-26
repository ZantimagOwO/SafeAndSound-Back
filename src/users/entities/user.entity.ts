import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryColumn()
    User_ID: number;

    @Column()
    DNI: string;
    
    Username: string;
    Name: string;
    Surname: string;
    Password: string;
}
