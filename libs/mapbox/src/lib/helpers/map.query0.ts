import { MapMouseEvent, EventData, Map } from 'mapbox-gl';
import { MapWhere } from '@uwmh/data';

export function mapQuery(e: MapMouseEvent & EventData, map: Map): MapWhere {
  const point = { x: e.point.x, y: e.point.y };
  const lngLat = { lng: e.lngLat.lng, lat: e.lngLat.lat };
  const features = map.queryRenderedFeatures(e.point);
  const properties = features.length ? features[0]['properties'] : {};
  return {
    point,
    lngLat,
    properties: properties as { [key: string]: any },
  };
}
