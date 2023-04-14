import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from '@hookform/devtools';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Slider,
  Space,
  Steps,
  Tabs,
} from 'antd';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import PhotoUpload from '../components/PhotoUpload';
import styles from '../styles/Home.module.css';

const { TextArea } = Input;

const marks = {
  0: 'A',
  10: 'B',
  20: 'C',
  30: 'D',
  40: 'E',
  50: 'F',
  60: 'G',
  70: 'H',
  80: 'I',
  90: 'J',
  100: 'K',
};

export default function Home() {
  const [step, setStep] = useState(0);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      prizeType: 'off-chain-items',
      package: {
        thumbnailCid: '',
        title: 'title',
        description: 'description',
      },
      prizeGradesRange: 50,
      prizeContents: [
        {
          thumbnailCid: '',
          name: '',
          amount: 1,
        },
      ],
      drawingPrice: 100,
    },
    mode: 'onChange',
  });

  const formData = useWatch({ control });

  const onStepChange = (value) => {
    setStep((theStep) => theStep + value);
  };

  const [form] = Form.useForm();

  const tabItems = useMemo(() => {
    const tabs = [];

    Object.keys(marks).forEach((rangeValue, index) => {
      if (rangeValue <= formData.prizeGradesRange) {
        console.log(formData.prizeContents, index);

        const isCompleted =
          formData.prizeContents[index] &&
          formData.prizeContents[index].thumbnailCid &&
          formData.prizeContents[index].thumbnailCid.length > 0 &&
          formData.prizeContents[index].name !== '' &&
          formData.prizeContents[index].amount > 0;

        tabs.push({
          key: index,
          label: (
            <Space>
              {`${marks[rangeValue]} Prize`}
              {isCompleted ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <ExclamationCircleOutlined style={{ color: 'red' }} />
              )}
            </Space>
          ),
          children: (
            <>
              <Form.Item label="prize thumbnail" required>
                <PhotoUpload
                  onCidChange={(cid) => {
                    setValue(`prizeContents.${index}.thumbnailCid`, cid);
                  }}
                />
              </Form.Item>
              <Form.Item label="prize name" required>
                <Controller
                  control={control}
                  name={`prizeContents.${index}.name`}
                  render={({ field }) => {
                    return (
                      <TextArea {...field} placeholder="prize name" autoSize />
                    );
                  }}
                />
              </Form.Item>
              <Form.Item label="prize amount" required>
                <Controller
                  control={control}
                  defaultValue={1}
                  name={`prizeContents.${index}.amount`}
                  render={({ field }) => {
                    return <InputNumber {...field} min={1} max={50} />;
                  }}
                />
              </Form.Item>
            </>
          ),
        });
      }
    });
    return tabs;
  }, [control, setValue, formData.prizeGradesRange, formData.prizeContents]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className={styles.main}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
        style={{ width: '100%' }}
        onFinish={handleSubmit(onSubmit)}
      >
        <DevTool control={control} />
        <Row gutter={16}>
          <Col span={12}>
            {step === 0 && (
              <Form.Item label="Select Prize type for sale" required>
                <Controller
                  control={control}
                  name="prizeType"
                  render={({ field }) => {
                    return (
                      <Radio.Group {...field}>
                        <Space direction="vertical">
                          <Radio value="off-chain-items">Off-chain Items</Radio>
                          <Radio value="unminted-nfts">Unminted NFTs</Radio>
                          <Radio value="minted-nfts">Minted NFTs</Radio>
                        </Space>
                      </Radio.Group>
                    );
                  }}
                />
              </Form.Item>
            )}
            {step === 1 && (
              <>
                <Form.Item label="Package thumbnail" required>
                  <PhotoUpload
                    onCidChange={(cid) => {
                      setValue('package.thumbnailCid', cid);
                    }}
                  />
                </Form.Item>
                <Form.Item label="Package title" required>
                  <Controller
                    control={control}
                    name="package.title"
                    render={({ field }) => {
                      return (
                        <TextArea
                          {...field}
                          placeholder="Add title for this package"
                          autoSize
                        />
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item label="Package description" required>
                  <Controller
                    control={control}
                    name="package.description"
                    render={({ field }) => {
                      return (
                        <TextArea
                          {...field}
                          placeholder="Add description for this package"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                      );
                    }}
                  />
                </Form.Item>
              </>
            )}
            {step === 2 && (
              <>
                <Form.Item label="Prize grades range" required>
                  <Controller
                    control={control}
                    name="prizeGradesRange"
                    render={({ field }) => {
                      return (
                        <Slider
                          {...field}
                          marks={marks}
                          step={null}
                          tooltip={{
                            formatter: (item) => marks[item],
                          }}
                        />
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item label="Prize contents" required>
                  <Tabs defaultActiveKey="1" items={tabItems} />
                </Form.Item>
              </>
            )}
            {step === 3 && (
              <Form.Item label="Drawing price" required>
                <Controller
                  control={control}
                  name="drawingPrice"
                  render={({ field }) => {
                    return <InputNumber {...field} min={1} max={9999999} />;
                  }}
                />
              </Form.Item>
            )}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <Space>
                {step > 0 && (
                  <Form.Item>
                    <Button onClick={() => onStepChange(-1)}>Prev</Button>
                  </Form.Item>
                )}
                {step <= 3 && (
                  <Form.Item>
                    <Button type="primary" onClick={() => onStepChange(1)}>
                      Next
                    </Button>
                  </Form.Item>
                )}
                {step === 4 && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Upload
                    </Button>
                  </Form.Item>
                )}
              </Space>
            </div>
          </Col>
          <Col span={4} />
          <Col span={8}>
            <Steps
              direction="vertical"
              current={step}
              items={[
                {
                  title: 'Step 1',
                  description: 'Prize type for sale',
                },
                {
                  title: 'Step 2',
                  description: 'Package info',
                },
                {
                  title: 'Step 3',
                  description: 'Upload your prizes',
                },
                {
                  title: 'Step 4',
                  description: 'Set up drawing price',
                },
                {
                  title: 'Step 5',
                  description: 'Confirmation',
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </main>
  );
}
