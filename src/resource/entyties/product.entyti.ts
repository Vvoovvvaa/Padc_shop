import { Base } from "./base.entyti";
import { Column, Entity } from "typeorm";
import { ManyToOne } from "typeorm";
import { Category } from "./category.entyti";
import { JoinColumn } from "typeorm";
import { ManyToMany } from "typeorm/browser";
import { OneToMany } from "typeorm";
import { OrderInfo } from "./order-info.entity";
import { IsOptional } from "class-validator";
import { ProductPhotos } from "./photos-entity";

@Entity('products')
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'numeric',default: 0 })
  price: number;

  @ManyToOne(() => Category, {onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => OrderInfo, (info) => info.product)
  orderInfos: OrderInfo[];

  @OneToMany(() => ProductPhotos,photos => photos.product)
  photos:ProductPhotos[]
    static id: number
}

