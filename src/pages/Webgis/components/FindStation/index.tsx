import { Col, Form, Input, message, Modal, Row } from 'antd';

import { findStationOptions } from '../../../../libs/options';

type Props = {
  onCancel: () => void;
  formular: string;
};

type FormValues = {
  x: number;
  y: number;
};

const FindStation = ({ formular, onCancel }: Props) => {
  const [form] = Form.useForm<FormValues>();
  const handleFindStation = async () => {
    message.info('Tính năng đang phát triển');
  };
  return (
    <Modal
      open
      width={400}
      onCancel={onCancel}
      onOk={handleFindStation}
      title={`Tìm trạm cứu hộ bằng ${
        findStationOptions[formular as keyof typeof findStationOptions]
      }`}
      okText="Tìm kiếm"
      cancelText="Hủy"
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
