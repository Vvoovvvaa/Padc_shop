import { Body, Controller,Get, Post } from '@nestjs/common';
import { OrderDto } from './DTO/order-dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderservice:OrdersService
    ) { }

    @Get('all')
    async orders(){
        return this.orderservice.viewOrders()
    }


    @Post('add')
    async createOrders(@Body() orderDto:OrderDto){
        return this.orderservice.addOrder(orderDto)
    }

    @Get('my')
    async myOrders(user_id:number){
        return this.orderservice.findOneOrder(user_id)
    }

}
