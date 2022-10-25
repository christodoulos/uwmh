import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LocationModule } from './location/location.module';
import { MultiBoundaryModule } from './multi_boundary/multi_boundary.module';
import { MultilineModule } from './multi_line/multi_line.module';

import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'attica-dt'),
      // exclude: ['/api*'],
    }),
    LocationModule,
    MultiBoundaryModule,
    MultilineModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
