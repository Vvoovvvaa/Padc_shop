import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entyties/order.entity';
import { User } from '../entyties/user.entyti';
import { Product } from '../entyties/product.entyti';
import { OrderInfo } from '../entyties/order-info.entity';
import { OrderDto } from './DTO/order-dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderepository: Repository<Order>,

        @InjectRepository(User)
        private readonly userrepository: Repository<User>,

        @InjectRepository(Product)
        private readonly productrepository: Repository<Product>,

        @InjectRepository(OrderInfo)
        private readonly orderInfoRepository: Repository<OrderInfo>
    ) {}

    async viewOrders() {
        return this.orderepository.find({
            relations: ['user'],
        });
    }

    async viewAllOrders(){
        return this.orderInfoRepository.find()
    }

    async create(orderDto: OrderDto, user: User): Promise<Order> {
        let order = await this.orderepository.findOne({
            where: { user: { id: user.id } },
            relations: ['orderInfos', 'orderInfos.product'],
        });

        if (!order) {
            order = this.orderepository.create({ user, totalPrice: 0 });
            await this.orderepository.save(order);
            order.orderInfos = [];
        }

        for (const item of orderDto.items) {
            const product = await this.productrepository.findOne({
                where: { id: item.productId },
            });

            if (!product) {
                throw new NotFoundException(`Product ${item.productId} not found`);
            }

            const existingInfo = order.orderInfos.find(
                info => info.product.id === item.productId
            );

            if (existingInfo) {
                existingInfo.quantity += item.quantity;
                await this.orderInfoRepository.save(existingInfo);
            } else {
                const newInfo = this.orderInfoRepository.create({
                    order,
                    product,
                    quantity: item.quantity,
                });
                await this.orderInfoRepository.save(newInfo);
                order.orderInfos.push(newInfo);
            }
        }

        let totalPrice = 0;
        for (const info of order.orderInfos) {
            const price = Number(info.product.price);
            const quantity = Number(info.quantity);

            if (isNaN(price) || isNaN(quantity)) {
                throw new BadRequestException('Некорректная цена или количество');
            }

            totalPrice += price * quantity;
        }

        order.totalPrice = totalPrice;
        return this.orderepository.save(order);
    }
}
