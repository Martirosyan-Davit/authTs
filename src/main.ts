import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function start() {
    const PORT = Number(process.env.PORT) || 8000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('authorization and authentication')
        .setDescription('REST api')
        .setVersion('1.0.0')
        .addTag('NEST_AUTH')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/documentation', app, document)


    await app.listen(PORT, () => console.log(`Server started on Port:  ${PORT}`));
}


start();