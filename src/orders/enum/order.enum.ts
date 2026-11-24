import { OrderStatus } from "../../generated/prisma/enums";

export const orderStatusList = {
  PENDING: OrderStatus.PENDING,
  COMPLETED: OrderStatus.COMPLETED,
  CANCELED: OrderStatus.CANCELED,
};
