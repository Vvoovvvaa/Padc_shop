import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from "./base.entyti";
import { User } from "./user.entyti";
import { Products } from "./product.entyti";

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