import _ from 'lodash';

import { headerCSV } from './options';

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
