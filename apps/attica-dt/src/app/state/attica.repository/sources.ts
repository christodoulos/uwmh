import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { River, Source, sources } from '@uwmh/data';
import { GeoJSONSourceRaw } from 'mapbox-gl';
import {
  lastValueFrom,
  map,
  mergeMap,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { BackendService } from '../../backend.service';
import * as geojson from 'geojson';

export interface GeoJSONMapSource {
  id: string;
  data: geojson.GeoJSON;
}

interface AtticaSources {
  boundary: GeoJSONMapSource | null;
  rivers: GeoJSONMapSource | null;
}

const atticaSources = createStore(
  { name: 'attica-sources' },
  withProps<AtticaSources>({ boundary: null, rivers: null })
);

@Injectable()
export class SourcesRepository {
  constructor(private backend: BackendService) {}

  boundary$ = atticaSources.pipe(select((state) => state.boundary));
  rivers$ = atticaSources.pipe(select((state) => state.rivers));

  async updateBoundary() {
    return await lastValueFrom(
      this.backend.getAtticaIndex().pipe(
        map((data) => data.boundary),
        mergeMap((id) => this.backend.getBoundary(id)),
        map((boundary) => ({
          boundary: {
            id: 'attica-boundary',
            data: boundary.geometry,
          },
        })),
        tap((boundary) =>
          atticaSources.update((state) => ({ ...state, ...boundary }))
        )
      )
    );
  }

  async updateRivers() {
    return await lastValueFrom(
      this.backend.getAtticaIndex().pipe(
        map((data) => data.rivers),
        mergeMap((ids) => this.backend.getRivers(ids)),
        map(
          (
            rivers // converts to FeatureCollection features
          ) =>
            rivers.map((river) => ({
              type: river.type,
              geometry: river.geometry,
              properties: river.properties,
            }))
        ),
        map((rivers) => ({
          rivers: {
            id: 'attica-rivers',
            data: { type: 'FeatureCollection' as const, features: [...rivers] },
          },
        })),
        tap((rivers) =>
          atticaSources.update((state) => ({ ...state, ...rivers }))
        )
      )
    );
  }
}
