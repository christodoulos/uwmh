import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Attica, AtticaSchema } from './app.schema';

import { join } from 'path';

import { BoundaryModule } from './boundary/boundary.module';
import { RiverModule } from './river/river.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'attica-dt'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot('process.env.DATABASE_URI'),
    MongooseModule.forFeature([
      {
        name: Attica.name,
        schema: AtticaSchema,
      },
    ]),
    BoundaryModule,
    RiverModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
