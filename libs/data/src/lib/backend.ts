import {
  Point,
  BBox,
  MultiPolygon,
  MultiLineString,
  GeoJsonProperties,
} from 'geojson';

export type SourceKey = 'attica-boundary' | 'attica-rivers';

// Backend related data shapes

// shape of /api/atica
export interface AtticaIndex {
  boundary: string;
  rivers: string[];
}

// shape of /api/boundary/:id
export interface Boundary {
  type: 'Feature';
  geometry: MultiPolygon;
  bbox: BBox;
  center: Point;
  properties: GeoJsonProperties;
}

// shape of /api/river/:id
export interface River {
  type: 'Feature';
  geometry: MultiLineString;
  bbox: BBox;
  center: Point;
  properties: GeoJsonProperties;
}
