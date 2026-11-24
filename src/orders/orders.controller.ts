import {
  Controller,
  Logger,
  NotImplementedException,
  ParseUUIDPipe,
} from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderPaginationDto } from "./dto";
import { OrderStatus } from "./enum";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: "create_order" })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({ cmd: "find_all_orders" })
  findAll(@Payload() paginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: "find_one_order" })
  findOne(@Payload("id", ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({ cmd: "find_all_orders_by_status" })
  findAllByStatus(
    @Payload()
    {
      status,
      ...paginationDto
    }: {
      status: OrderStatus;
      paginationDto: OrderPaginationDto;
    },
  ) {
    Logger.log(`status: ${status}`, "OrdersController");
    return this.ordersService.findAll({ status, ...paginationDto });
  }

  @MessagePattern({ cmd: "change_order_status" })
  changeOrderStatus(
    @Payload() { id, status }: { id: number; status: boolean },
  ) {
    throw new NotImplementedException("Method not implemented.");
  }
}
