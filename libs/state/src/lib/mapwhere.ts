import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { MapWhere, MapWhereInit } from '@uwmh/data';

const mapwhere = createStore(
  { name: 'mapwhere' },
  withProps<MapWhere>(MapWhereInit)
);

@Injectable()
export class MapWhereRepository {
  type$ = mapwhere.pipe(select((state) => state.properties?.type));

  update(data: MapWhere) {
    mapwhere.update((state) => ({
      ...state,
      ...data,
    }));
  }
}
