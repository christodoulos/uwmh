export interface MapWhere {
  point: { x: number; y: number };
  lngLat: { lng: number; lat: number };
  properties?: {
    category_en?: string;
    class?: string;
    maki?: string;
    name?: string;
    name_local?: string;
    name_script?: string;
    type?: string;
    iso_3166_1?: string;
    filterrank?: number;
    sizerank?: number;
  };
}
