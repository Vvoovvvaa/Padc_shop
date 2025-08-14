import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base.entyti";
import { Order } from "./order.entity";
import { Exclude } from "class-transformer";

@Entity('user')
export class User extends Base {
  @Column({name:"first_name",nullable:true}) 
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({nullable:true})
  photo:string

}
