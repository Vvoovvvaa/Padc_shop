import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
export class User extends Base{
    @Column({name:"first_name"})
    firstName:string

    @Column({name:"last_name"})
    lastName:string

    @Column()
    age:number

    @Column()
    email:string

    @Column()
    password:string
}