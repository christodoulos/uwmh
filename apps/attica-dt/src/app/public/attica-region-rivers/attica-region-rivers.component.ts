import { Component, OnInit } from '@angular/core';
import * as geojson from 'geojson';

@Component({
  selector: 'uwmh-attica-region-rivers',
  templateUrl: './attica-region-rivers.component.html',
  styleUrls: ['./attica-region-rivers.component.css'],
})
export class AtticaRegionRiversComponent implements OnInit {
  features: geojson.Feature[] = [];

  ngOnInit(): void {
    const layerKeys = ['Feature-AtticaRegion'];
    for (const key of layerKeys) {
      const featureStr = localStorage.getItem(key);
      if (featureStr) {
        const feature = JSON.parse(featureStr) as unknown as geojson.Feature;
        this.features.push(feature);
      }
    }
    console.log('GGGGGGGGGGGG', this.features);
  }
}
