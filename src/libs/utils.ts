import _ from 'lodash';

import { headerCSV } from './options';

// epsg 4326: [lng, lat]
// epsg 3857: [x, y]

export const epsg4326toEpsg3857 = (coordinate: number[]) => {
  const lat = coordinate[1];
  const lng = coordinate[0];
  const x = (lng * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
};

export const epsg3857toEpsg4326 = (coordinate: number[]) => {
  const x = coordinate[0];
  const y = coordinate[1];
  const lng = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return [lng, lat];
};

export const geoJsonToCsv = (geoJson: any) => {
  const rows = _.flatten(
    geoJson.features.map((feature: any, featuresIndex: number) =>
      _.flatten(
        feature.geometry.coordinates.map((coordinate: any, coordinateIndex: number) =>
          coordinate.map((item: any) => [
            featuresIndex,
            feature.type,
            feature.geometry.type,
            coordinateIndex,
            item[0],
            item[1],
          ])
        )
      )
    )
  );
  return [headerCSV, ...rows];
};

export const csvToGeoJson = (csv: any[]) => {
  const features = _.groupBy(csv.slice(1), (item) => item[0]);
  return {
    type: 'FeatureCollection',
    features: Object.values(features).map((feature: any) => ({
      type: feature[0][1],
      geometry: {
        type: feature[0][2],
        coordinates: Object.values(_.groupBy(feature, (item) => item[3])).map((coordinate: any) =>
          coordinate.map((item: any) => [item[4], item[5]])
        ),
      },
    })),
  };
};

export const csv3857ToGeoJson = (csv: any[], type: string) => {
  switch (type) {
    case 'point':
      return {
        type: 'FeatureCollection',
        features: csv.slice(1).map((item) => ({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: epsg3857toEpsg4326([item[1], item[2]]),
          },
        })),
      };
    case 'line':
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: csv.slice(1).map((item) => epsg3857toEpsg4326([item[1], item[2]])),
            },
          },
        ],
      };
    case 'polygon':
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [csv.slice(1).map((item) => epsg3857toEpsg4326([item[1], item[2]]))],
            },
          },
        ],
      };
    default:
      return {
        type: 'FeatureCollection',
        features: [],
      };
  }
};
