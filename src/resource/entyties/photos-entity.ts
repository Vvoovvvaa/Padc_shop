import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entyti";
import { Product } from "./product.entyti";
import { Category } from "./category.entyti";

@Entity()
export class ProductPhotos extends Base{
    @ManyToOne(() => Product,product => product.photos)
    @JoinColumn({name:"product_id"})
    product:Product | null

    @ManyToOne(() => Category, (category) => category.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category | null;
    
    @Column()
    path:string
    

}