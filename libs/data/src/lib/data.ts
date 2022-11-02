import * as geojson from 'geojson';
import { AnySourceData, GeoJSONSourceRaw } from 'mapbox-gl';

// Frontend related data shapes

export type DTFeatureCollection = geojson.FeatureCollection;

export interface DTFeature extends geojson.Feature {
  center: geojson.Point;
}

export const InitDTFeature: DTFeature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0],
  },
  properties: {},
  center: {
    type: 'Point',
    coordinates: [0, 0],
  },
};

export const InitFeatureCollection: geojson.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {},
    },
  ],
};

export interface MapSource {
  id: string;
  source: GeoJSONSourceRaw;
}

export type SourceKey = 'attica-boundary' | 'attica-rivers';

export interface Source {
  'attica-boundary': MapSource;
  'attica-rivers': MapSource;
}

export const MapSourceInit: MapSource = {
  id: 'source',
  source: { type: 'geojson', data: InitDTFeature },
};

export const sources: {
  'attica-boundary': MapSource;
  'attica-rivers': MapSource;
} = {
  'attica-boundary': MapSourceInit,
  'attica-rivers': MapSourceInit,
};

// Backend related data shapes

// shape of /api/atica
export interface AtticaIndex {
  boundary: string;
  rivers: string[];
}

// shape of /api/boundary/:id
export interface Boundary {
  type: 'Feature';
  geometry: geojson.MultiPolygon;
  bbox: geojson.BBox;
  center: geojson.Point;
  properties: geojson.GeoJsonProperties;
}

// shape of /api/river/:id
export interface River {
  type: 'Feature';
  geometry: geojson.MultiLineString;
  bbox: geojson.BBox;
  center: geojson.Point;
  properties: geojson.GeoJsonProperties;
}
