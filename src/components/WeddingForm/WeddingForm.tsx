import { Button, Form, Input, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


interface IProps {
  onSuccess: () => void,
}

const WeddingForm = ({
    onSuccess
}: IProps) => {
  const [form] = Form.useForm();
  
  // const isBringingKids = (value: string) => {
  //   switch (value) {
  //     case '是':
  //       form.setFieldsValue({ Children: '是'});
  //       break;
  //     case '否':
  //       form.setFieldsValue({ Children: '否'});
  //       form.setFieldsValue({ ChildrenNumber: 0});
  //       break;
  //     default:
  //   }
  // };

  // const isKidsTooMany = () => {
  //   const total = form.getFieldValue("Number");
  //   const kidsNumber = form.getFieldValue("ChildrenNumber")
  //   if(kidsNumber >= total) {
  //     alert('請確認用餐人數及兒童座椅數量')
  //     form.setFieldsValue({
  //       Number: null,
  //       ChildrenNumber: null,
  //     })
  //   }
  // };

     const isVeggieTooMany = () => {
      const total = form.getFieldValue("Number");
      const veggieNumber = form.getFieldValue("Veggie")
      if(veggieNumber > total) {
        alert('會不會太多人吃素')
        form.setFieldsValue({
          Veggie: null,
        })
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

      isVeggieTooMany()
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }

    fetch("https://script.google.com/macros/s/AKfycby84DHTx_AGKe_Hh6VBU3AvvYbE17Fksj8pXu6gDgkpIRF2S2ZLHGHEPCtFh6ALblu0/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
      form.resetFields();
      onSuccess();
  };

  const onReset = () => {
    form.resetFields();
  };

  const validateMessages = {
    required: "這裡沒填到 回來重填！",
  }
  return (
      <>
        <Text>日期：2023.10.15</Text>
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
        <Form.Item name="Number" label="今天幾位用餐？" rules={[{ required: true }]}>
          <Select
              placeholder="請選擇人數"
              // onChange={isBringingKids}
              allowClear
            >
              <Option value={1}>林北一位</Option>
              <Option value={2}>我要攜伴</Option>
          </Select>
        </Form.Item>
        {/*<Form.Item name="Children" label="是否需要兒童座椅？" rules={[{ required: true }]}>*/}
        {/*  <Select*/}
        {/*    placeholder="今天要顧小孩嗎？"*/}
        {/*    onChange={isBringingKids}*/}
        {/*    allowClear*/}
        {/*  >*/}
        {/*    <Option value="是">是</Option>*/}
        {/*    <Option value="否">否</Option>*/}
        {/*  </Select>*/}
        {/*</Form.Item>*/}
        {/*<Form.Item*/}
        {/*  noStyle*/}
        {/*  shouldUpdate={(prevValues, currentValues) => prevValues.children !== currentValues.children}*/}
        {/*>*/}
        {/*  {({ getFieldValue }) =>*/}
        {/*    getFieldValue('Children') === '是' ? (*/}
        {/*      <Form.Item name="ChildrenNumber" label="需要幾張兒童座椅？" rules={[{ required: true }]}>*/}
        {/*        <Select*/}
        {/*          placeholder="請選擇張數"*/}
        {/*          onChange={isKidsTooMany}*/}
        {/*          allowClear*/}
        {/*        >*/}
        {/*      <Option value={1}>一張就好：）</Option>*/}
        {/*      <Option value={2}>兩張，謝謝</Option>*/}
        {/*  </Select>*/}
        {/*      </Form.Item>*/}
        {/*    ) : null*/}
        {/*  }*/}
        {/*</Form.Item>*/}
        <Form.Item name="Veggie" label="今天幾位吃素？" rules={[{ required: true }]}>
          <Select
            placeholder="吃素嗎？還是今天要吃肉一下？"
            onChange={isVeggie}
            allowClear
          >
            <Option value="0">沒在跟你吃素</Option>
            <Option value="1">🥬 x 1</Option>
            <Option value="2">🥬 x 2</Option>
          </Select>
        </Form.Item>
        <ButtonContainer>
          <Button type="primary" htmlType="submit">
              勇敢送出
          </Button>
          <Button htmlType="button" onClick={onReset}>
            打掉重練
          </Button>
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