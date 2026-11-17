import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
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
    return {
      id,
      product: "Product 1",
      quantity: 2,
      price: 20.0,
      status: "pending",
    };
  }
}
