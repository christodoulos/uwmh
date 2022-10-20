import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly service: LocationService) {
    this.service.findAll().then((data) => {
      console.log(data);
    });
  }

  @Get()
  async findAllLocations() {
    return await this.service.findAll();
  }
}
