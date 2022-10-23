import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MapboxModule } from '@uwmh/mapbox';

import { AtticaRegionBoundaryComponent } from './attica-region-boundary/attica-region-boundary.component';
import { AtticaRegionRiversComponent } from './attica-region-rivers/attica-region-rivers.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'boundaries', component: AtticaRegionBoundaryComponent },
      { path: 'rivers', component: AtticaRegionRiversComponent },
      { path: '', component: AtticaRegionBoundaryComponent },
    ]),
    MapboxModule,
  ],
  declarations: [AtticaRegionBoundaryComponent, AtticaRegionRiversComponent],
})
export class PublicModule {}
