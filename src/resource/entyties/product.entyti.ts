import { Base } from "./base.entyti";
import { Column, Entity } from "typeorm";
import { ManyToOne } from "typeorm";
import { Category } from "./category.entyti";
import { JoinColumn } from "typeorm";


@Entity('products')
export class Products extends Base {

    @Column()
    productName: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, {onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;
}

