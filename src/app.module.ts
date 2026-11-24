import { Module } from "@nestjs/common";
import { OrdersModule } from "./orders/orders.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
