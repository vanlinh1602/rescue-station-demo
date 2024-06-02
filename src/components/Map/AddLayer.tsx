import { ColorPicker, Form, Input, Modal } from 'antd';
import { Color } from 'antd/es/color-picker';
import { nanoid } from 'nanoid';

type Props = {
  onAddLayer: (layer: { name: string; color: string; id: string }) => void;
  onCancel: () => void;
};

const AddLayer = ({ onAddLayer, onCancel }: Props) => {
  const [form] = Form.useForm<{ name: string; color: Color }>();

  const handleOk = async () => {
    try {
      const { name, color } = await form.validateFields();
      onAddLayer({ id: nanoid(), name, color: `#${color.toHex()}` });
    } catch {
      /* empty */
    }
  };

  return (
    <Modal open title="Thêm Layer" onCancel={onCancel} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên layer"
          name="name"
          rules={[{ required: true, message: 'Vui lòng đặt tên layer' }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Màu"
          name="color"
          rules={[{ required: true, message: 'Vui lòng chọn màu' }]}
        >
          <ColorPicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLayer;
