export const findStationOptions = {
  pCenter: 'P-Center',
  lscp: 'LSCP',
};

export const fileFormats = {
  geojson: 'GeoJSON',
  csv: 'CSV',
};

export const headerCSV = [
  'features_index',
  'features_type',
  'geometry_type',
  'geometry_coordinates_index',
  'lat',
  'lng',
];

export const headerCSV3857 = ['id', 'x', 'y'];

export const mapingType = {
  point: 'Point',
  line: 'LineString',
  polygon: 'Polygon',
};
