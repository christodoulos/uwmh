import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NurseryService } from './nursery.service';

@Controller('nursery')
export class NurseryController {
  constructor(private readonly service: NurseryService) {
    this.plc_get_latest().then((data) => console.log(data));
  }

  @Get()
  async get_all() {
    return await this.service.get_all();
  }

  @Get('latest')
  async get_latest() {
    return await this.service.get_latest();
  }

  @Get('plc')
  async plc_get_all() {
    return await this.service.plc_get_all();
  }

  @Get('plc/latest')
  async plc_get_latest() {
    return await this.service.plc_get_latest();
  }
}
