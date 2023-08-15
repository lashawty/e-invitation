import { Button, Form, Input, Select } from 'antd';
import styled from 'styled-components';
import {useState} from 'react';
interface IProps {
    onSuccess: () => void,
}

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const googleSheetUrl = "https://script.google.com/macros/s/AKfycby84DHTx_AGKe_Hh6VBU3AvvYbE17Fksj8pXu6gDgkpIRF2S2ZLHGHEPCtFh6ALblu0/exec";


const WeddingForm = ({
    onSuccess
}: IProps) => {
    const [form] = Form.useForm();
    const [is2Available, setIs2Available] = useState(false);

    const getTotal = () => {
        const total = form.getFieldValue("Number");
        if(total > 1) {
            setIs2Available(true);
        } else {
            setIs2Available(false);
            form.setFieldsValue({Veggie: null});
        }
    };

    const isVeggie = (value: string) => {
        switch (value) {
          case '0':
            form.setFieldsValue({ Veggie: '0' });
            break;
          case '1':
            form.setFieldsValue({ Veggie: '1' });
            break;
          case '2':
            form.setFieldsValue({ Veggie: '2' });
            break;
          default:
        }
    };

    const onFinish = (values: any) => {
        const formData = new FormData();
        for (let key in values) {
            if (values.hasOwnProperty(key)) formData.append(key, values[key]);
        }

    fetch(googleSheetUrl, {
        method: "POST",
        body: formData,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
        form.resetFields();
        onSuccess();
    };

    const onReset = () => {
        form.resetFields();
    };

    const validateMessages = {required: "這裡沒填到 回來重填！"}

    return (
        <>
            <Text>日期：2023.10.15 星期日</Text>
            <Text>時間：18:00</Text>
            <Text>地點：心之芳庭</Text>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ width: '100%', marginTop: '5px'}}
                validateMessages={validateMessages}
            >
                <Form.Item name="Name" label="姓名" rules={[{ required: true }]}>
                  <Input placeholder='報上名來！'/>
                </Form.Item>

                <Form.Item name="Number" label="總共幾位用餐？" rules={[{ required: true }]}>
                  <Select
                      placeholder="請選擇總人數"
                      allowClear
                      onChange={getTotal}
                  >
                      <Option value={1}>林北一位 👤</Option>
                      <Option value={2}>我要攜伴 👥</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="Veggie" label="請問幾位吃素？" rules={[{ required: true }]}>
                    <Select
                        placeholder="請選擇素食者人數"
                        onChange={isVeggie}
                        allowClear
                    >
                        <Option value="0">沒在跟你吃素 🍗</Option>
                        <Option value="1">🥬 x 1</Option>
                        {is2Available && <Option value="2">🥬 x 2</Option>}
                    </Select>
                </Form.Item>

                <ButtonContainer>
                    <Button type="primary" htmlType="submit">勇敢送出</Button>
                    <Button htmlType="button" onClick={onReset}>重寫一遍</Button>
                </ButtonContainer>
            </Form>
        </>
    );
}

export default WeddingForm;

const Text = styled.p`
  margin-top: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`