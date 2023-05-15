import { PageContainer } from '@/components/PageContainer';
import { InteractivePumpkins } from '@/components/particles/InteractivePumpkins';
import { minDesktop, minTablet } from '@/styles/mediaQueries';
import {
  Button,
  ColProps,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Typography,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Head from 'next/head';
import { useCallback } from 'react';
import styled from 'styled-components';

const FORM_LABEL_WIDTH = 4;
const FORM_INPUT_WIDTH = 14;

const FORM_LABEL_COLUMN: ColProps = { span: FORM_LABEL_WIDTH };
const FORM_WRAPPER_COLUMN: ColProps = { span: FORM_INPUT_WIDTH };

// const PageContainer = styled.div`
//   padding: 20px;
// `;

const FormContainer = styled.div`
  margin: 0;
  padding: 0 10px;
  position: absolute;
  transform: translate(50%, -50%);
  right: 50%;
  text-align: left;
  top: 50%;
  z-index: 1000;
  width: 100%;

  @media ${minTablet} {
    padding: 0;
    max-width: 500px;
  }

  /* @media ${minDesktop} {
    padding: 0;
  } */
`;

const StyledTitle = styled(Typography.Title).attrs({ level: 1 })`
  && {
    color: #ffffff;
    font-size: 30px;
  }
`;

const StyledInput = styled(Input).attrs({ bordered: false })`
  color: #ffffff;
  font-size: 100px;
  && {
    color: #ffffff;
    .ant-select-selection-placeholder {
      color: #ffffff;
    }
  }
`;

interface CustomCountdownFormData {
  holidayName: string;
  holidayMessage: string;
  month: number;
  day: number;
}

export default function CreatePage() {
  const [form] = useForm<CustomCountdownFormData>();

  const onSubmit = useCallback((data: CustomCountdownFormData) => {
    console.log(data);
  }, []);

  return (
    <>
      <Head>
        <title>Create countdown</title>
      </Head>
      <main>
        <PageContainer>
          <FormContainer>
            {/* <StyledTitle>Create countdown</StyledTitle> */}
            <Form
              form={form}
              onFinish={onSubmit}
              // labelCol={FORM_LABEL_COLUMN}
              // wrapperCol={FORM_WRAPPER_COLUMN}
            >
              <Form.Item
                name="holiday"
                rules={[
                  { required: true, message: 'A holiday name is required' },
                  {
                    max: 10,
                    message:
                      'Max character length for holiday name is 10 characters',
                  },
                ]}
              >
                <StyledInput
                  placeholder="holiday name (eg Christmas, Easter, Harry's Birthday, etc.)"
                  maxLength={10}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="holidayMessage"
                rules={[
                  { required: true, message: 'A holiday message is required' },
                  {
                    max: 20,
                    message:
                      'Max character length for holiday name is 20 characters',
                  },
                ]}
              >
                <Input
                  placeholder="holiday message (eg Merry Christmas!, Happy Easter! etc.)"
                  maxLength={20}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                name="date"
                rules={[{ required: true, message: 'Month is required' }]}
              >
                <DatePicker allowClear />
              </Form.Item>
              <Form.Item
                name="month"
                rules={[{ required: true, message: 'Month is required' }]}
              >
                <InputNumber placeholder="month" min={1} max={12} />
              </Form.Item>
              <Form.Item
                name="day"
                rules={[{ required: true, message: 'Day is required' }]}
              >
                <InputNumber placeholder="day" min={1} max={31} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          </FormContainer>
          <InteractivePumpkins />
        </PageContainer>
      </main>
    </>
  );
}
