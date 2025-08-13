import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./base.entyti";
import { User } from "./user.entyti";
import { OrderInfo } from "./order-info.entity";
import { Product } from "./product.entyti";


@Entity('orders')
export class Order extends Base {
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderInfo, (info) => info.order, { cascade: true })
  orderInfos: OrderInfo[];


  @Column({name:"total_price",type: "decimal",default: 0})
  totalPrice:number

}
