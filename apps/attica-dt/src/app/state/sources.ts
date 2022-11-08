import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { lastValueFrom, map, mergeMap, tap } from 'rxjs';
import { BackendService } from '../backend.service';
import { MapSources, sourcesInit } from '@uwmh/data';

const atticaSources = createStore(
  { name: 'sources' },
  withProps<MapSources>(sourcesInit)
);

@Injectable()
export class SourcesRepository {
  constructor(private backend: BackendService) {}

  attica_boundary$ = atticaSources.pipe(
    select((state) => state['attica-boundary'])
  );
  attica_rivers$ = atticaSources.pipe(
    select((state) => state['attica-rivers'])
  );

  async updateAll() {
    return await Promise.all([
      this.updateAtticaBoundary(),
      this.updateAtticaRivers(),
    ]);
  }

  async updateAtticaBoundary() {
    return await lastValueFrom(
      this.backend.getAtticaIndex().pipe(
        map((data) => data.boundary),
        mergeMap((id) => this.backend.getBoundary(id)),
        map((boundary) => ({
          'attica-boundary': {
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

  async updateAtticaRivers() {
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
          'attica-rivers': {
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
