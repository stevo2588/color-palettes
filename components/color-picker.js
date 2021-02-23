import React from 'react';
import { Form, InputNumber } from 'antd';


const RGBInput = ({ label, value, onChange, marginBottom }) => (
  <Form.Item
    label={label}
    rules={[{ type: 'integer', required: true, min: 0, max: 255 }]}
    style={{ marginBottom: marginBottom == null ? undefined : marginBottom }}
  >
    <InputNumber
      min={0}
      max={255}
      value={value}
      onChange={n => onChange(n)}
      style={{ width: '100%' }}
    />
  </Form.Item>
);

const ColorPicker = ({ value: { red, green, blue }, onChange }) => (
  <div style={{ display: 'flex', flex: 1, flexDirection: 'row', width: 300 }}>
    <div style={{ flex: 1, margin: 10 }}>
      <RGBInput label="R" value={red} onChange={n => onChange({ red: n, green, blue })} />
      <RGBInput label="G" value={green} onChange={n => onChange({ red, green: n, blue })} />
      <RGBInput label="B" value={blue} onChange={n => onChange({ red, green, blue: n })} marginBottom={0} />
    </div>
    <div style={{ flex: 2, backgroundColor: `rgb(${red}, ${green}, ${blue})`, margin: 10 }} />
  </div>
);

export default ColorPicker;
