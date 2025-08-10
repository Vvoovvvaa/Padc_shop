import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from '../entyties/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './DTO/order-dto';
import { User } from '../entyties/user.entyti';
import { Products } from '../entyties/product.entyti';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly orderepository:Repository<Orders>,
        @InjectRepository(User)
        private readonly userrepository:Repository<User>,
        @InjectRepository(Products)
        private readonly productrepository:Repository<Products>
    ) { }

    async viewOrders(){

        return this.orderepository.find({
            relations:['product','user']
        })
    }

    async addOrder(orderDto: OrderDto) {
    const product = await this.productrepository.findOneBy({ id: orderDto.productId });
    if (!product) {
        throw new NotFoundException('Product not found');
    }

    const user = await this.userrepository.findOneBy({ id: orderDto.userId });
    if (!user) {
        throw new NotFoundException('User not found');
    }

    const order = this.orderepository.create({
        ...orderDto,
        product,
        user,
    });

    return await this.orderepository.save(order);
}

    async findOneOrder(user_id:number):Promise<Orders[]>{
        return await this.orderepository.find({
            where:{user: {id:user_id}},
            relations:['user']
        })
    }

}
