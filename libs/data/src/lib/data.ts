import * as geojson from 'geojson';

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
