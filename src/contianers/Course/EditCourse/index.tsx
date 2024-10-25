
import { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCourse,  useEditInfo } from '../../../service/course';


interface IProps {
  id?: string;
  onClose: (isReload?:boolean) => void;
  open: boolean
}

/**
*
*/
const EditCourse = ({
    open,
    onClose,
    id,
}:IProps) => {
    const [form] = Form.useForm()
    const [edit,editLoading] = useEditInfo()
    const {getCourse,loading} = useCourse()
    const onSubmitHandler=async ()=>{
        const values= await form.validateFields()
        if(values){
            edit(id,values,onClose)
        }

    }
    useEffect(()=>{
        const init = async()=>{
            if(id){
            const res= await getCourse({
            variables:{
                id
            }
        })
        form.setFieldsValue(res.data.getCourseInfo.data)
        }else{
            form.resetFields()
        }
        }
        init()
    },[id])

    return (
    <Drawer open={open} onClose={()=>onClose()}
        title={id?'Edit course':'Create new course'}
        width={720}
        forceRender
        extra={(
            <Space>
                <Button onClick={()=>onClose()}>Cancel</Button>
                <Button onClick={onSubmitHandler} loading={editLoading}>Submit</Button>
            </Space>
        )}
    >
        <Spin spinning={loading}>
        <Form form={form}>
            <Form.Item label="Course name" name='name' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Course description" name='desc'>
                <TextArea rows={5} showCount maxLength={200}/>
            </Form.Item>
            <Row gutter={20}>
            <Col>        
            <Form.Item label="Maximum students" name='limitNumber' rules={[{required:true}]}>
                <InputNumber min={0}/>
            </Form.Item>
            </Col>
            <Col>
            <Form.Item label="Duration" name='duration' rules={[{required:true}]}>
                <InputNumber min={0} addonAfter='minutes'/>
            </Form.Item>
            </Col>
            </Row>
            <Form.Item label="Age group" name='group' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Basic ability" name='baseAbility' rules={[{required:true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Reserve Info" name='reserveInfo' rules={[{required:true}]}>
                <TextArea rows={5} showCount maxLength={200}/>
            </Form.Item>
            <Form.Item label="Refund Info" name='refundInfo' rules={[{required:true}]}>
                <TextArea rows={5} showCount maxLength={200}/>
            </Form.Item>
            <Form.Item label="Additional Info" name='otherInfo'>
                <TextArea rows={5} showCount maxLength={200}/>
            </Form.Item>
        </Form>
        </Spin>
    </Drawer>);
};

export default EditCourse;
