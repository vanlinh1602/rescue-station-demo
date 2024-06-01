import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import webgisImg from '../../assets/webgis.jpg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', padding: '0px 20px' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title>Webgis Trạm cứu hộ</Typography.Title>
      </div>
      <div>
        <Typography.Title level={2}>1. Giới thiệu</Typography.Title>
        <Typography.Paragraph>
          Webgis Trạm cứu hộ là một ứng dụng webgis giúp người dân dễ dàng tìm kiếm thông tin về
          trạm cứu hộ gần nhất.
        </Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={2}>2. Đơn vị sử dụng webgis</Typography.Title>
        <Typography.Paragraph>
          Trạm PCCC, Bộ Công An, Bộ GTVT, Trạm y tế và các ban ngành liên quan
        </Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={2}>3. Tính năng</Typography.Title>
        <Typography.Paragraph>
          <ul>
            <li>Tìm kiếm trạm cứu hộ gần nhất</li>
            <li>Xem thông tin chi tiết của trạm cứu hộ</li>
            <li>Đánh giá trạm cứu hộ</li>
          </ul>
        </Typography.Paragraph>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          hoverable
          style={{ width: 300 }}
          cover={<img style={{ height: 100, objectFit: 'fill' }} alt="example" src={webgisImg} />}
          onClick={() => navigate('/webgis')}
        >
          <Typography.Text>Chuyển đến trang map</Typography.Text>
        </Card>
      </div>
    </div>
  );
};

export default Home;
