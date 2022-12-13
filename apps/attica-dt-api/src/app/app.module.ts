import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Attica, AtticaSchema } from './app.schema';

import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { BoundaryModule } from './boundary/boundary.module';
import { RiverModule } from './river/river.module';
import { NurseryModule } from './nursery/nursery.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'attica-dt'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/attica-dt-beta'),
    MongooseModule.forFeature([
      {
        name: Attica.name,
        schema: AtticaSchema,
      },
    ]),
    AuthModule,
    BoundaryModule,
    RiverModule,
    NurseryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
