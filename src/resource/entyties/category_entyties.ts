import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base";
import { EnumCategory } from "../category/enums/category_enum";
import { Products } from "./product_entyties";

@Entity()
export class Category extends Base{
    @Column({name:"category_name"})
    categoryName:string

    @Column({type:"enum",enum:EnumCategory})
    type:EnumCategory

    @Column()
    description:string

    @ManyToOne(() => Category,category => category.children)
    parent:Category

    @OneToMany(() => Category,category =>category.parent)
    children:Category[]

    @OneToMany(() => Products,product =>product.category)
    product:Products[]


}