import { Entity, ManyToOne, JoinColumn, Column } from "typeorm";
import { Base } from "./base.entyti";
import { Product } from "./product.entyti";
import { Order } from "./order.entity";

@Entity('order_info')
export class OrderInfo extends Base {
  @ManyToOne(() => Order, (order) => order.orderInfos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderInfos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;
}
