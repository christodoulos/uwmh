import { MapMouseEvent, EventData, Map, Popup } from 'mapbox-gl';

export function mapQuery(
  event: MapMouseEvent & EventData,
  map: Map,
  popup: Popup
) {
  console.log(event.point, event.lngLat);
  const features = map.queryRenderedFeatures(event.point);
  // Limit the number of properties we're displaying for
  // legibility and performance

  console.log(features);

  const displayProperties = [
    'type',
    'properties',
    'id',
    'layer',
    'source',
    'sourceLayer',
    'state',
  ];

  const displayFeatures = features.map((feat: { [key: string]: any }) => {
    const displayFeat = {} as { [key: string]: any };
    displayProperties.forEach((prop) => {
      displayFeat[prop] = feat[prop];
    });
    return displayFeat;
  });

  console.log(displayFeatures);

  if (displayFeatures.length) {
    if (displayFeatures[0]['properties']['type'] === 'plant_nursery') {
      map.getCanvas().style.cursor = 'pointer';
      popup
        .setLngLat(event.lngLat)
        .setHTML(
          '<strong>Plant nursery</strong> <p>Click to view available data</p>'
        )
        .addTo(map);
    } else {
      map.getCanvas().style.cursor = 'default';
      popup.remove();
    }
  }
}
