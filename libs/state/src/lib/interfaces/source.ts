import { GeoJSON } from 'geojson';

export interface GeoJSONMapSource {
  id: string;
  data: GeoJSON;
}

export interface MapSources {
  'attica-boundary': GeoJSONMapSource;
  'attica-rivers': GeoJSONMapSource;
}
