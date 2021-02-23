import { Form, Input } from 'antd';
import ColorPicker from '../components/color-picker';


const Home = () => {
  const [form] = Form.useForm();

  return (
    <Form
      name="colorpicker"
      form={form}
      initialValues={{ color: { red: 0, green: 0, blue: 0 } }}
      onBlur={() => form.submit()}
      onFinish={(values) => console.log(values)}
      requiredMark={false}
    >
      <Form.Item name="color">
        <ColorPicker />
      </Form.Item>
      <Form.Item hidden><Input type="submit" /></Form.Item>
    </Form>
  );
};

export default Home;
