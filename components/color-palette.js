import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import ColorPicker from '../components/color-picker';


const ColorPalette = ({ values, onSave }) => {
  const [form] = Form.useForm();
  useEffect(() => form.resetFields(), [values]);

  return (
    <Form
      name="colorpalette"
      form={form}
      initialValues={values}
      onFinish={(values) => onSave(values)}
      requiredMark={false}
    >
      <Form.Item name="name">
        <Input />
      </Form.Item>

      {[0,1,2,3,4].map(c => (
        <Form.Item key={`color${c.toString()}`} name={`color${c.toString()}`}>
          <ColorPicker />
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ColorPalette;
