import * as geojson from 'geojson';

export interface Layer {
  source_id: string;
  id: string;
  type: string;
  center?: geojson.Point;
  bbox?: geojson.BBox;
  layout_visibility: boolean;
  paint_fill_color?: string;
  paint_fill_opacity?: number;
  paint_line_color?: string;
  paint_line_width?: number;
}

export interface Custom3DModelLayer {
  id: string;
  modelOrigin: geojson.Point;
  modelUrl: string;
  layout_visibility: boolean;
}

export interface MapLayers {
  'attica-region-boundary-line': Layer;
  'attica-region-boundary-fill': Layer;
  'attica-perfecture-rivers': Layer;
  'custom-athens-plant-nursery': Custom3DModelLayer;
  'custom-portara': Custom3DModelLayer;
  'custom-hellinikon': Custom3DModelLayer;
}
