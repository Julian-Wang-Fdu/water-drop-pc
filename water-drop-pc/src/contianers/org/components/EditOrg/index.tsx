
import { useEditInfo, useOrganization } from '../../../../service/org';
import { Button, Col, Divider, Drawer, Form, Input, Row, Select, Spin, UploadFile } from 'antd';
import { IOrganization } from '../../../../utils/types';
import { useMemo } from 'react';
import UploadImage from '../../../../components/OSSImageUpload';


interface IProp {
  id: string;
  onClose: () => void;
}
/**
*
*/
const EditOrg = ({
  id,
  onClose,
}: IProp) => {
  const [form] = Form.useForm();

  const { data, loading: queryLoading } = useOrganization(id);
  const [edit, editLoading] = useEditInfo();

  const onFinishHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        orgFrontImg: values?.orgFrontImg?.map((item: UploadFile) => ({ url: item.url })),
        orgRoomImg: values?.orgRoomImg?.map((item: UploadFile) => ({ url: item.url })),
        orgOtherImg: values?.orgOtherImg?.map((item: UploadFile) => ({ url: item.url })),
      } as IOrganization;
      edit(id, formData);
    }
  };

  const initValue = useMemo(() => (data ? {
    ...data,
    tags: data.tags?.split(','),
    logo: [{ url: data.logo }],
    identityCardBackImg: [{ url: data.identityCardBackImg }],
    identityCardFrontImg: [{ url: data.identityCardFrontImg }],
    businessLicense: [{ url: data.businessLicense }],
  } : {}), [data]);

  if (queryLoading) {
    return <Spin />;
  }

  return (
    <Drawer
      title="Edit store resources"
      width="70vw"
      onClose={onClose}
      open
      footerStyle={{ textAlign: 'right' }}
      footer={(
        <Button
          loading={editLoading}
          type="primary"
          onClick={onFinishHandler}
        >
          Save
        </Button>
      )}
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row  gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: '100%' }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <UploadImage
                maxCount={1}
                label="Replace Logo"
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: '100%' }}
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input store name" />
            </Form.Item>
          </Col>
        </Row>
        <Row  gutter={20}>
          <Col span={11}>
            <Form.Item
              label="Label"
              name="tags"
              rules={[{ required: true }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please input label"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="tel"
              name="tel"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input telephone number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="longitude"
              name="longitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input longitude" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="latitude"
              name="latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input latitude" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="address"
          name="address"
          rules={[{ required: true }]}
        >
          <Input placeholder="Please input address" />
        </Form.Item>
        <Form.Item
          label="Store introduction"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            allowClear
            showCount
          />
        </Form.Item>
        <Row  gutter={20}>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="Business License"
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Replace Business License"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="The font side of Identity card"
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Replace Identity card"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="The reverse side of Identity card"
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Replace Identity card"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Images for the top of the store: Aspect ratio is 2:1; Up to 5 images can be uploaded. </Divider>
        <Form.Item name="orgFrontImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>Images for the store interior: Aspect ratio is 2:1; Up to 5 images can be uploaded. </Divider>
        <Form.Item name="orgRoomImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>Images for other parts of the store: Aspect ratio is 2:1; Up to 5 images can be uploaded. </Divider>
        <Form.Item name="orgOtherImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
