import { MapSources } from '../source';
import { Point } from 'geojson';

const point: Point = { type: 'Point', coordinates: [0, 0] };

export const sourcesInit: MapSources = {
  'attica-boundary': { id: 'attica-boundary', data: point },
  'attica-rivers': { id: 'attica-rivers', data: point },
};
