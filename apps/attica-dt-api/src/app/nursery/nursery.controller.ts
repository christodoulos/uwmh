import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NurseryService } from './nursery.service';

@Controller('nursery')
export class NurseryController {
  constructor(private readonly service: NurseryService) {
    this.get_all().then((data) => console.log(data));
  }

  @Get()
  async get_all() {
    return await this.service.get_all();
  }
}
