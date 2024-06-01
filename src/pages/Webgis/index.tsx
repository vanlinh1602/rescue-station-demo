import { Button, Layout, message } from 'antd';
import { useState } from 'react';

import { Map, UploadCSV } from '../../components';
import { layerDefault } from './data';
import FindRescueStation from './FindRescueStation';
import { Layer } from './type';

const Webgis = () => {
  const [layers, setLayers] = useState<Layer[]>(layerDefault);
  const [findStation, setFindStation] = useState(false);
  console.log(layers);

  return (
    <Layout
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      {findStation ? <FindRescueStation onCancel={() => setFindStation(false)} /> : null}
      <Layout.Sider
        width="15%"
        style={{
          padding: '20px 0',
          textAlign: 'center',
          lineHeight: '40px',
          backgroundColor: '#fff',
        }}
      >
        <Button type="primary" style={{ width: '80%' }} onClick={() => setFindStation(true)}>
          Tìm trạm cứu hộ
        </Button>
        <Button
          type="primary"
          style={{ width: '80%' }}
          onClick={() => message.info('Tính năng đang phát triển')}
        >
          Xem điểm trạm
        </Button>
        <UploadCSV
          type="primary"
          style={{ width: '80%' }}
          onUpload={(data) => setLayers((pre) => [...pre, data])}
        >
          Thêm layer
        </UploadCSV>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            textAlign: 'center',
            color: '#fff',
            height: 50,
            paddingInline: 48,
            lineHeight: '50px',
            fontSize: 24,
            backgroundColor: '#4096ff',
          }}
        >
          Bản đồ trạm cứu hộ
        </Layout.Header>
        <Layout.Content
          style={{ height: window.innerHeight - 50, maxHeight: window.innerHeight - 50 }}
        >
          <Map layers={layers} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Webgis;
