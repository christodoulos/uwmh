import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MapboxModule } from '@uwmh/mapbox';

import { AtticaRegionBoundariesComponent } from './attica-region-boundaries/attica-region-boundaries.component';
import { AtticaRegionRiversComponent } from './attica-region-rivers/attica-region-rivers.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'boundaries', component: AtticaRegionBoundariesComponent },
      { path: 'rivers', component: AtticaRegionRiversComponent },
      { path: '', component: AtticaRegionBoundariesComponent },
    ]),
    MapboxModule,
  ],
  declarations: [AtticaRegionBoundariesComponent, AtticaRegionRiversComponent],
})
export class PublicModule {}
