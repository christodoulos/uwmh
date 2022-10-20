import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'attica-dt'),
      // exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    LocationModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
