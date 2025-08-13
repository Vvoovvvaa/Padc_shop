import { Body, Controller,Get, Post, UseGuards } from '@nestjs/common';
import { OrderDto } from './DTO/order-dto';
import { OrdersService } from './orders.service';
import { AuthUser } from 'src/decorators/auth.decorator';
import { User } from '../entyties/user.entyti';
import { AuthGuard } from 'src/guards/auth_guard';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderservice:OrdersService
    ) { }

    @Get('my')
    async orders(){
        return this.orderservice.viewOrders()
    }

    @UseGuards(AuthGuard)
    @Post('add')
    async createOrders(@Body() orderDto:OrderDto,@AuthUser() user:User){
        return this.orderservice.create(orderDto,user)
    }

    @Get('all')
    async allOrders(){
        return this.orderservice.viewAllOrders()
    }

}
