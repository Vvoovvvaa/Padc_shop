import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entyti";
import { Product } from "./product.entyti";

@Entity()
export class Category extends Base{
    @Column({name:"category_name"})
    categoryName:string

    @Column()
    description:string

    @ManyToOne(() => Category,category => category.children)
    parent:Category

    @OneToMany(() => Category,category =>category.parent)
    children:Category[]

    @OneToMany(() => Product,product =>product.category)
    product:Product[]

    @Column({nullable:true})
    photo:string


}