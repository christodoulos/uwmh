import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NurseryService } from './nursery.service';

@Controller('nursery')
export class NurseryController {
  constructor(private readonly service: NurseryService) {
    // this.get_latest().then((data) => console.log(data));
  }

  @Get()
  async get_all() {
    return await this.service.get_all();
  }

  @Get('latest')
  async get_latest() {
    return await this.service.get_latest();
  }
}
