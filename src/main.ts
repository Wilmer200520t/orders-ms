import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { envs } from "../config";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.APP_PORT,
      },
    },
  );

  await app.listen();

  Logger.log(
    `Orders Microservice running on port ${envs.APP_PORT}`,
    "AppOrders",
  );
}
bootstrap();
