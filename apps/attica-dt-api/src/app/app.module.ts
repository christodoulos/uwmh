import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Attica, AtticaSchema } from './app.schema';

import { join } from 'path';

import { LocationModule } from './location/location.module';
import { MultiBoundaryModule } from './multi_boundary/multi_boundary.module';
import { MultilineModule } from './multi_line/multi_line.module';
import { BoundaryModule } from './boundary/boundary.module';
import { RiverModule } from './river/river.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'attica-dt'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      {
        name: Attica.name,
        schema: AtticaSchema,
      },
    ]),
    LocationModule,
    MultiBoundaryModule,
    MultilineModule,
    BoundaryModule,
    RiverModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
