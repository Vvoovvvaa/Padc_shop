import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entyti";
import { Product } from "./product.entyti";
import { ProductPhotos } from "./photos-entity";

@Entity()
export class Category extends Base{
    @Column({name:"category_name"})
    categoryName:string

    @Column()
    description:string

    @ManyToOne(() => Category,category => category.children)
    @JoinColumn({name:'Parent_id'})
    parent:Category

    @OneToMany(() => Category,category =>category.parent)
    children:Category[]

    @OneToMany(() => Product,product =>product.category)
    product:Product[]

    @OneToMany(() => ProductPhotos,photos => photos.category)
    photos:ProductPhotos[]




}