import {
  EyeOutlined,
  FileAddOutlined,
  FileTextOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, MenuProps, message } from 'antd';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Map } from '../../components';
import { findStationOptions } from '../../libs/options';
import { ExportLayer, FindStation, ImportLayer } from './components';
import { layerDefault } from './data';
import { Layer } from './type';

const Webgis = () => {
  const [layers, setLayers] = useState<CustomObject<Layer>>({});
  const [findStation, setFindStation] = useState<string>();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);

  useEffect(() => {
    const layerData: CustomObject<Layer> = {};
    layerDefault.forEach((layer) => {
      layerData[layer.id] = layer;
    });
    setLayers(layerData);
  }, []);

  const items: MenuProps['items'] = useMemo(() => {
    return [
      {
        icon: <SearchOutlined />,
        key: 'find-station',
        label: 'Tìm trạm cứu hộ',
        children: Object.entries(findStationOptions).map(([key, label]) => ({
          key,
          label: `Tìm trạm bằng ${label}`,
        })),
      },
      {
        icon: <EyeOutlined />,
        key: 'view-station',
        label: 'Xem trạm cứu hộ',
      },
      {
        icon: <FileAddOutlined />,
        key: 'add-layer',
        label: 'Thêm layer',
      },
      {
        icon: <FileTextOutlined />,
        key: 'export-layer',
        label: 'Xuất layer',
      },
    ];
  }, []);

  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      {findStation ? (
        <FindStation formular={findStation} onCancel={() => setFindStation('')} />
      ) : null}
      {isImport ? (
        <ImportLayer
          onCancel={() => setIsImport(false)}
          onUpload={(data) => {
            setLayers((pre) => ({
              ...pre,
              [data.id]: data,
            }));
            setIsImport(false);
          }}
        />
      ) : null}
      {isExport ? <ExportLayer layers={layers} onCancel={() => setIsExport(false)} /> : null}
      <Layout>
        <Layout.Content>
          <div className="leaflet-top leaflet-left" style={{ marginLeft: 100 }}>
            <Dropdown
              className="leaflet-control"
              menu={{
                items,
                onClick: ({ keyPath }) => {
                  const path = _.last(keyPath);

                  switch (path) {
                    case 'find-station':
                      setFindStation(keyPath[0]);
                      break;
                    case 'view-station':
                      message.info('Tính năng đang phát triển');
                      break;
                    case 'add-layer':
                      setIsImport(true);
                      break;
                    case 'export-layer':
                      setIsExport(true);
                      break;
                    default:
                      break;
                  }
                },
              }}
              placement="bottomLeft"
            >
              <Button>
                Tính năng
                <MenuOutlined />
              </Button>
            </Dropdown>
          </div>
          <Map
            layers={layers}
            onAddLayer={(newLayer) =>
              setLayers((pre) => ({
                ...pre,
                [newLayer.id]: newLayer,
              }))
            }
          />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Webgis;
