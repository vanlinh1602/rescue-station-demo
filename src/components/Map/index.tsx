import { useRef } from 'react';
import { GeoJSON, LayersControl, MapContainer, TileLayer } from 'react-leaflet';

import { Layer } from '../../pages/Webgis/type';

type Props = {
  layers: Layer[];
};

const Map = ({ layers }: Props) => {
  const mapRef = useRef<any>();
  // const [data, setData] = useState<any>(null);

  return (
    <div style={{ height: '100%' }}>
      <MapContainer ref={mapRef} center={[10.877624025081147, 106.77712164784637]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          {layers.map((layer) => (
            <LayersControl.Overlay name={layer.name} key={layer.name} checked>
              <GeoJSON data={layer.geoJson} pathOptions={{ color: layer.color }} />
            </LayersControl.Overlay>
          ))}
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default Map;
