import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@uwmh/material';
import { UiformsModule } from '@uwmh/uiforms';
import { NgxEchartsModule } from 'ngx-echarts';

import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { LayerToggleComponent } from './layer-toggle/layer-toggle.component';
import { MapInfoComponent } from './map-info/map-info.component';
import { DrawnGeoJsonComponent } from './drawn-geo-json/drawn-geo-json.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WeatherbitInfoComponent } from './weatherbit-info/weatherbit-info.component';
import { PlantNurseryPlcComponent } from './datatables/plant-nursery-plc/plant-nursery-plc.component';
import { LinePlotComponent } from './line-plot/line-plot.component';
import { EydapAnalysesAPNDialogComponent } from './eydap-analyses-a-p-n/eydap-analyses-a-p-n.component';
import { EydapApnComponent } from './datatables/eydap-apn/eydap-apn.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UiformsModule,
    NgxEchartsModule,
  ],
  declarations: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
    WeatherbitInfoComponent,
    PlantNurseryPlcComponent,
    LinePlotComponent,
    EydapAnalysesAPNDialogComponent,
    EydapApnComponent,
  ],
  exports: [
    WelcomeDialogComponent,
    LayerToggleComponent,
    MapInfoComponent,
    DrawnGeoJsonComponent,
    SignUpComponent,
    LinePlotComponent,
    EydapAnalysesAPNDialogComponent,
  ],
})
export class DialogModule {}
