import {
  DeleteOutlined,
  EyeOutlined,
  FileAddOutlined,
  FileTextOutlined,
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, MenuProps, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { Map } from '../../components';
import { ExportLayer, FindStation, ImportLayer, RemoveLayer } from './components';
import { layerDefault } from './data';
import { Layer } from './type';

const Webgis = () => {
  const [layers, setLayers] = useState<CustomObject<Layer>>({});
  const [findStation, setFindStation] = useState<boolean>();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

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
        icon: <DeleteOutlined />,
        key: 'remove-layer',
        label: 'Xóa layer',
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
      {findStation ? <FindStation onCancel={() => setFindStation(false)} /> : null}
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
      {isRemove ? (
        <RemoveLayer
          layers={Object.values(layers).map((layer) => ({ id: layer.id, name: layer.name }))}
          onRemoveLayer={(ids) => {
            const rest = { ...layers };
            ids.forEach((id) => {
              delete rest[id];
            });
            setLayers(rest);
            setIsRemove(false);
          }}
          onCancel={() => setIsRemove(false)}
        />
      ) : null}
      <Layout>
        <Layout.Content>
          <div className="leaflet-top leaflet-left" style={{ marginLeft: 100 }}>
            <Dropdown
              className="leaflet-control"
              menu={{
                items,
                onClick: ({ key }) => {
                  switch (key) {
                    case 'find-station':
                      setFindStation(true);
                      break;
                    case 'view-station':
                      message.info('Tính năng đang phát triển');
                      break;
                    case 'add-layer':
                      setIsImport(true);
                      break;
                    case 'remove-layer':
                      setIsRemove(true);
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
