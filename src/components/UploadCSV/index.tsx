/* eslint-disable no-empty */
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Form, Input, message, Modal, Upload } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { Color } from 'antd/es/color-picker';
import { ColorFactory } from 'antd/es/color-picker/color';
import { nanoid } from 'nanoid';
import Papa from 'papaparse';
import { useState } from 'react';

import { Layer } from '../../pages/Webgis/type';

type Props = BaseButtonProps & {
  style: React.CSSProperties;
  onUpload: (data: Layer) => void;
};

const UploadFileCSV = ({ onUpload, ...props }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<{ lat: string; lng: string; color: Color; name: string }>();

  const handleConfirm = async () => {
    try {
      const { lat, lng, color, name } = await form.validateFields();
      if (!file) {
        message.error('Vui lòng chọn file');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = Papa.parse<CustomObject<string>>((e.target?.result as string) ?? '', {
          header: true,
        });
        const parsedData = csv?.data;
        const coordinate: number[][] = [];
        parsedData?.forEach((item) => {
          if (item[lat] && item[lng]) {
            coordinate.push([Number(item[lat]), Number(item[lng])]);
          }
        });
        const geoJson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              id: nanoid(),
              properties: {
                name: file?.name,
              },
              geometry: {
                type: 'Polygon',
                coordinates: [coordinate],
              },
            },
          ],
        };
        console.log(color);

        onUpload({ geoJson, color: `#${color.toHex()}`, name });
        setIsModalOpen(false);
      };
      reader.readAsText(file as Blob);
    } catch {}
  };

  return (
    <div>
      <Button {...props} onClick={() => setIsModalOpen(true)} />
      {isModalOpen ? (
        <Modal
          title="Nhập file CSV"
          open
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="back" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleConfirm}>
              Nhập
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ color: new ColorFactory('#3388FF') }}
          >
            <Form.Item
              label="Tên Layer"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên layer' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên cột vĩ độ (lat)"
              name="lat"
              rules={[{ required: true, message: 'Vui lòng nhập tên cột vĩ độ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên cột kinh độ (lng)"
              name="lng"
              rules={[{ required: true, message: 'Vui lòng nhập tên cột kinh độ' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Chọn màu" name="color">
              <ColorPicker />
            </Form.Item>
          </Form>
          {!file ? (
            <Upload.Dragger
              name="file"
              multiple={false}
              accept=".csv"
              beforeUpload={(info) => setFile(info as File)}
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data
                or other banned files.
              </p>
            </Upload.Dragger>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {file.name}
              <DeleteOutlined style={{ color: 'red' }} onClick={() => setFile(null)} />
            </div>
          )}
        </Modal>
      ) : null}
    </div>
  );
};

export default UploadFileCSV;
