import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, orderStatusList, PaginationDto } from "../enum";

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(orderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      orderStatusList,
    ).join(", ")}`,
  })
  status?: OrderStatus;
}
