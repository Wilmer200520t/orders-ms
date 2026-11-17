import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PrismaClient } from "@prisma/client/scripts/default-index.js";

@Injectable()
export class OrdersService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    Logger.log("OrdersService connected to the database", "OrdersService");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log("OrdersService disconnected from the database", "OrdersService");
  }

  create(createOrderDto: CreateOrderDto) {
    return "This action adds a new order";
  }

  findAll() {
    return [
      {
        id: 1,
        product: "Product 1",
        quantity: 2,
        price: 20.0,
        status: "pending",
      },
    ];
  }

  findOne(id: number) {
    return;
  }
}
