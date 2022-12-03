import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@uwmh/material';

import { WeatherbitInfoComponent } from './weatherbit-info/weatherbit-info.component';
import { PlantNurseryPlcComponent } from './plant-nursery-plc/plant-nursery-plc.component';

import { PNWeatherRepository } from './state/pnweather';
import { PNPLCEntities } from './state/pnplc';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [WeatherbitInfoComponent, PlantNurseryPlcComponent],
  exports: [WeatherbitInfoComponent, PlantNurseryPlcComponent],
  providers: [PNWeatherRepository, PNPLCEntities],
})
export class UiModule {}
