import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user_entyties";
import { Products } from "./product_entyties";

@Entity()
export class Orders extends Base{
    @Column()
    price:number

    @OneToOne(() => User)
    @JoinColumn({name:"user_id"})
    product:Products

    @OneToOne(() => Products)
    @JoinColumn({name:"product_id"})
    user:User

    @Column()
    quantity:number
}