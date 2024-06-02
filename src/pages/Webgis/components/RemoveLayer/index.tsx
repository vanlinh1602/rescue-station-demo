import { Form, Modal, Select } from 'antd';

type Props = {
  layers: { name: string; id: string }[];
  onRemoveLayer: (ids: string[]) => void;
  onCancel: () => void;
};

const RemoveLayer = ({ onCancel, onRemoveLayer, layers }: Props) => {
  const [form] = Form.useForm<{ ids: string[] }>();
  return (
    <Modal
      open
      width={400}
      title="Xóa Layer"
      onCancel={onCancel}
      onOk={async () => {
        try {
          const { ids } = await form.validateFields();
          onRemoveLayer(ids);
        } catch {
          /* empty */
        }
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name={'ids'}>
          <Select
            mode="multiple"
            options={layers.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RemoveLayer;
