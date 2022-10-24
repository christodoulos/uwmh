import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LocationModule } from './location/location.module';
import { MultiBoundaryModule } from './multi_boundary/multi_boundary.module';
import { MultilineModule } from './multi_line/multi_line.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI),
    LocationModule,
    MultiBoundaryModule,
    MultilineModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
