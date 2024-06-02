/* eslint-disable no-empty */
import { DeleteOutlined, FileExcelOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Col, ColorPicker, Form, Input, Menu, message, Modal, Row, Upload } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { Color } from 'antd/es/color-picker';
import { ColorFactory } from 'antd/es/color-picker/color';
import { nanoid } from 'nanoid';
import Papa from 'papaparse';
import { useState } from 'react';

import { headerCSV } from '../../../../libs/options';
import { csvToGeoJson } from '../../../../libs/utils';
import { Layer } from '../../type';

type Props = BaseButtonProps & {
  onCancel: () => void;
  onUpload: (data: Layer) => void;
};

const ImportLayer = ({ onUpload, onCancel }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<string>('geojson');
  const [form] = Form.useForm<{ color: Color; name: string }>();

  const handleConfirm = async () => {
    try {
      const { color, name } = await form.validateFields();
      if (!file) {
        message.error('Vui lòng chọn file');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        let geoJson;
        if (importType === 'geojson') {
          geoJson = JSON.parse(e.target?.result as string);
        } else {
          const csv = Papa.parse<string[]>((e.target?.result as string) ?? '');
          const parsedData = csv?.data;
          if (headerCSV.some((header, index) => header !== parsedData?.[0]?.[index])) {
            message.error('File không đúng định dạng');
            return;
          }
          geoJson = csvToGeoJson(parsedData);
        }
        onUpload({ geoJson, color: `#${color.toHex()}`, name, id: nanoid() });
      };
      reader.readAsText(file as Blob);
    } catch {}
  };

  return (
    <Modal
      title="Thêm layer"
      open
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleConfirm}>
          Nhập
        </Button>,
      ]}
    >
      <Menu
        onClick={({ key }) => setImportType(key)}
        selectedKeys={[importType]}
        mode="horizontal"
        items={[
          {
            label: 'Geojson',
            key: 'geojson',
          },
          {
            label: 'CSV',
            key: 'csv',
          },
        ]}
      />
      <div style={{ marginTop: 10 }}>
        <Form form={form} layout="vertical" initialValues={{ color: new ColorFactory('#3388FF') }}>
          {importType === 'csv' ? (
            <Row justify="space-between">
              <Button
                onClick={() => {
                  const csv = Papa.unparse([headerCSV]);
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'file_mau.csv';
                  a.click();
                }}
                style={{ margin: '10px 0px' }}
                type="primary"
                ghost
              >
                Tải file mẫu
                <FileExcelOutlined />
              </Button>
            </Row>
          ) : null}
          <Row justify="space-between">
            <Col span={18}>
              <Form.Item
                label="Tên Layer"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên layer' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Chọn màu" name="color">
                <ColorPicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      {!file ? (
        <Upload.Dragger
          name="file"
          multiple={false}
          accept={importType === 'geojson' ? '.geojson' : '.csv'}
          beforeUpload={(info) => setFile(info as File)}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-hint">Nhấn hoặc thả file vào vị trí này để tải lên</p>
        </Upload.Dragger>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {file.name}
          <DeleteOutlined style={{ color: 'red' }} onClick={() => setFile(null)} />
        </div>
      )}
    </Modal>
  );
};

export default ImportLayer;
