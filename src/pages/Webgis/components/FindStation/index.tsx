import { Button, Col, Form, Input, message, Modal, Row } from 'antd';

import { findStationOptions } from '../../../../libs/options';

type Props = {
  onCancel: () => void;
};

type FormValues = {
  x: number;
  y: number;
};

const FindStation = ({ onCancel }: Props) => {
  const [form] = Form.useForm<FormValues>();
  const handleFindStation = async (key: string) => {
    console.log(key);
    message.info('Tính năng đang phát triển');
  };
  return (
    <Modal
      open
      width={400}
      onCancel={onCancel}
      title={'Tìm trạm cứu hộ'}
      footer={[
        <Row justify="space-between">
          {Object.entries(findStationOptions).map(([key, value]) => (
            <Button type="primary" key={key} onClick={() => handleFindStation(key)}>
              {`Tìm bằng ${value}`}
            </Button>
          ))}
        </Row>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row justify="space-between" gutter={[12, 12]}>
          <Col span={12}>
            <Form.Item
              label="Nhập X"
              name="x"
              rules={[{ required: true, message: 'Vui lòng nhập X' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nhập Y"
              name="y"
              rules={[{ required: true, message: 'Vui lòng nhập Y' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FindStation;
