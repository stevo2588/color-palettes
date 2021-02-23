import { Button, Form, Input } from 'antd';
import ColorPicker from '../components/color-picker';


const ColorPalette = ({ values, onSave }) => {
  const [form] = Form.useForm();

  return (
    <Form
      name="colorpalette"
      form={form}
      initialValues={values}
      onFinish={(values) => onSave(values)}
      requiredMark={false}
    >
      {[0,1,2,3,4].map(c => (
        <Form.Item key={c.toString()} name={c.toString()}>
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
