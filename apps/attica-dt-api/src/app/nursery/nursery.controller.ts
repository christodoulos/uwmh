import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EYDAP_APN_DTO } from '@uwmh/state';
import { NurseryService } from './nursery.service';

@Controller('nursery')
export class NurseryController {
  constructor(private readonly service: NurseryService) {
    // this.plc_get_latest().then((data) => console.log(data));
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

  @Get('eydap')
  async eydap_apn_get_all_analyses() {
    return await this.service.eydap_apn_analyses();
  }

  @Post('eydap')
  async eydap_apn_analysis_write(@Body() body: { data: EYDAP_APN_DTO }) {
    console.log(body);
    return await this.service.eydap_apn_analysis_write(body.data);
  }
}
