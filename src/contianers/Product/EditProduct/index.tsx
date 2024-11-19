import { Button, Col, Divider, Drawer, Form, Input, InputNumber, Row, Space, Spin } from "antd";
import { useEditProductInfo, useProductInfo } from "../../../service/product";
import { useState } from "react";
import TypeSelect from "../../../components/TypeSelect";
import UploadImage from '../../../components/OSSImageUpload';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

/**
* 创建/编辑商品
*/
const EditCourse = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditProductInfo();
  const { data, loading } = useProductInfo(id);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
        coverUrl: values.coverUrl[0].url,
        bannerUrl: values.bannerUrl[0].url,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
    <Drawer
      title={id ? 'Edit product' : 'Create Product'}
      width={900}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            提交
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        {(data || !id) && (
        <Form
          form={form}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={18}>
              <Form.Item
                style={{ width: '100%' }}
                label="Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={6}>
              <Form.Item
                label="商品分类"
                name="type"
                rules={[{ required: true }]}
              >
                <TypeSelect />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Original Price"
                name="originalPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Preferential Price"
                name="preferentialPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
                label="Personal purchase restriction"
                name="limitBuyNumber"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
          </Row>
          <Form.Item
            label="Description"
            name="desc"
            rules={[{ required: true }]}
          >
            <TextArea
              maxLength={200}
              rows={5}
              allowClear
              showCount
            />
          </Form.Item>
          <Divider>Pictures</Divider>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="coverUrl"
                label="Images for the cover: Aspect ratio is 16:9 "
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <UploadImage
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bannerUrl"
                label="Images for banner: Aspect ratio is 16:9 "
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <UploadImage
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;

