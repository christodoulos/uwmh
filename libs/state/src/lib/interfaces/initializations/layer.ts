import { MapLayers } from '../layer';

export const LayersInit: MapLayers = {
  // //////////////////////////////
  // Attica Region Boundary Line //
  /////////////////////////////////
  'attica-region-boundary-line': {
    layout_visibility: true,
    source_id: 'attica-boundary',
    id: 'attica-boundary-line',
    type: 'line',
    center: {
      type: 'Point',
      coordinates: [23.60081445472357, 37.840157656066665],
    },
    bbox: [
      22.890433795328608, 35.82375709947115, 24.1164944580261,
      38.340999434049955,
    ],
    paint_line_color: '#000',
    paint_line_width: 1,
  },
  /////////////////////////////////
  // Attica Region Boundary Fill //
  /////////////////////////////////
  'attica-region-boundary-fill': {
    layout_visibility: true,
    source_id: 'attica-boundary',
    id: 'attica-boundary-fill',
    type: 'fill',
    center: {
      type: 'Point',
      coordinates: [23.60081445472357, 37.840157656066665],
    },
    bbox: [
      22.890433795328608, 35.82375709947115, 24.1164944580261,
      38.340999434049955,
    ],
    paint_fill_color: '#F00',
    paint_fill_opacity: 0.4,
  },
  //////////////////////////////
  // Attica Perfecture Rivers //
  //////////////////////////////
  'attica-perfecture-rivers': {
    layout_visibility: false,
    source_id: 'attica-rivers',
    id: 'attica-rivers',
    type: 'line',
    bbox: [
      22.848511300642798, 37.62036675138182, 24.182549647704207,
      38.36211380168018,
    ],
    paint_line_color: '#00F',
    paint_line_width: 2,
  },
  /////////////////////////////////////
  // Athens Municipal Plant Nurscery //
  /////////////////////////////////////
  'custom-athens-plant-nursery': {
    id: 'custom-athens-plant-nursery',
    modelOrigin: {
      type: 'Point',
      coordinates: [23.781372557061157, 37.988260208268386],
    },
    // modelUrl: 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
    modelUrl: '/assets/tank.glb',
    layout_visibility: true,
  },
  /////////////////////
  // Portara @ Naxos //
  /////////////////////
  'custom-portara': {
    id: 'custom-portara',
    modelOrigin: {
      type: 'Point',
      coordinates: [25.37260003010752, 37.11014654505334],
    },
    modelUrl: '/assets/portara.glb',
    layout_visibility: true,
  },
};
