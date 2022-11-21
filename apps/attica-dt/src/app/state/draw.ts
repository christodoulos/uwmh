import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { FeatureCollection } from 'geojson';

const drawnFeatures = createStore(
  { name: 'drawn' },
  withProps<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  })
);

@Injectable({ providedIn: 'root' })
export class DrawnFeaturesRepository {
  features$ = drawnFeatures.pipe(select((state) => state));

  update(features: FeatureCollection) {
    drawnFeatures.update((state) => ({
      ...state,
      ...features,
    }));
  }
}
