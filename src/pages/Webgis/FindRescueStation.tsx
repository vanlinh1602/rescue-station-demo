import { Button, Form, Input, message, Modal } from 'antd';

type Props = {
  onCancel: () => void;
};

type FormValues = {
  x: number;
  y: number;
};

const FindRescueStation = ({ onCancel }: Props) => {
  const [form] = Form.useForm<FormValues>();
  return (
    <Modal open onCancel={onCancel} title="Tìm trạm cứu hộ" footer={null}>
      <Form form={form}>
        <Form.Item label="Nhập X" name="x" rules={[{ required: true, message: 'Vui lòng nhập X' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Nhập Y" name="y" rules={[{ required: true, message: 'Vui lòng nhập Y' }]}>
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={() => message.info('Tính năng đang phát triển')}>
            Tìm trạm bằng P-Center
          </Button>
          <Button type="primary" onClick={() => message.info('Tính năng đang phát triển')}>
            Tìm trạm bằng LSCP
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FindRescueStation;
