import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { MapLayers, LayersInit } from '../interfaces';
import { BehaviorSubject, map, Observable, of as ObservableOf } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

type ObjectKey = keyof typeof LayersInit;

const layers = createStore(
  { name: 'layers' },
  withProps<MapLayers>(LayersInit)
);

// prettier-ignore
@Injectable()
export class LayersRepository {
  attica_boundary_line$ = layers.pipe(select((state) => state['attica-region-boundary-line']) );
  attica_boundary_fill$ = layers.pipe( select((state) => state['attica-region-boundary-fill']) );
  attica_rivers$ = layers.pipe(select((state) => state['attica-perfecture-rivers']));
  athens_plant_nurcery$ = layers.pipe( select((state) => state['custom-athens-plant-nursery']) );
  portara$ = layers.pipe(select(state=>state['custom-portara']))
  ellinikon$ = layers.pipe(select(state=>state['custom-hellinikon']))
  geojson_layers$ = ObservableOf([
    this.attica_boundary_line$,
    this.attica_boundary_fill$,
    this.attica_rivers$,
  ]);
  custom_3d_layers$ = ObservableOf([
    this.athens_plant_nurcery$,
    this.portara$,
    this.ellinikon$
  ])
  
  layer_visibility_change$ = new BehaviorSubject(uuidv4())

  toggle_layer(state_key: string) {
    const s = layers
      .pipe(select((state) => state[state_key as ObjectKey]))
      .subscribe((layer) => {
        layer.layout_visibility = !layer.layout_visibility;
        layers.update((state) => ({ ...state, layer }));
      });
    s.unsubscribe();
  }

  is_layer_visible(state_key: string): Observable<boolean> {
    return layers
    .pipe(
      select((state) => state[state_key as ObjectKey]),
      map(layer=>layer.layout_visibility)
      )
  }

  set_layer_visibility(state_key: string, status: boolean) {
    const s = layers
      .pipe(select((state) => state[state_key as ObjectKey]))
      .subscribe((layer) => {
        layer.layout_visibility = status;
        layers.update((state) => ({ ...state, layer }));
        this.layer_visibility_change$.next(uuidv4())
      });
    s.unsubscribe();
  }

  hide_layer(state_key: string) {
    this.set_layer_visibility(state_key, false)
  }

  show_layer(state_key:string) {
    this.set_layer_visibility(state_key, true)
  }

}
