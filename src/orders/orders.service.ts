import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/env";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PrismaClient } from "../generated/prisma/client";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class OrdersService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      adapter: new PrismaPg({ connectionString: envs.DATABASE_URL }),
    });
  }

  async onModuleInit() {
    await this.$connect();
    Logger.log("OrdersService connected to the database", "OrdersService");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.log("OrdersService disconnected from the database", "OrdersService");
  }

  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: {
        totalAmount: createOrderDto.totalAmount,
        totalItems: createOrderDto.totalItems,
        orderStatus: createOrderDto.status,
        paid: Boolean(createOrderDto.paid),
      },
    });
  }

  findAll() {
    return this.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new RpcException(`Order with id ${id} not found`);
    }

    return order;
  }
}
