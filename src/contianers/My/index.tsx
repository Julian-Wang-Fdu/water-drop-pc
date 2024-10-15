
import { PageContainer, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Col, Form, message, Row } from 'antd';
import { useEffect, useRef } from 'react';
import OSSImageUpload from '../../components/OSSImageUpload';
import { useUserContext } from '../../hooks/userHook';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../graphql/user';


/**
*
*/
const My = ({}) => {
    const [updateUserInfo]=useMutation(UPDATE_USER)
    const formRef = useRef<ProFormInstance>();
    const { store } = useUserContext();
    useEffect(() => {
    formRef.current?.setFieldsValue({
      account: store.account,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store])
    return (
    <PageContainer>
        <ProForm
            layout='horizontal'
            formRef={formRef}
            submitter ={{
                resetButtonProps:{
                    style:{display:'none'}
                },
                searchConfig:{submitText: 'Submit'}
            }}
            onFinish={async(values)=>{
                console.log('values',values)
                console.log('avatar',values.avatar[0]?.url)
                const res=updateUserInfo({
                    variables:{
                        id: store.id,
                        params:{
                            name: values.name,
                            desc: values.desc,
                            avatar: values.avatar[0]?.url || ''
                        }
                        
                    }
                })
                if((await res).data.updateUserInfo.code===200){
                    store.refetchHandler()
                    message.success('update success')
                }else{
                    message.error((await res).data.updateUserInfo.message)
                }
                
            }}
        >
            <Row gutter={20}>
                <Col>
                    <ProFormText
                    name= "account"
                    label ="account"
                    tooltip = 'Cannot edit'
                    disabled
                    />
                    <ProFormText
                    name='name'
                    label = 'nickname'
                    placeholder='Please input nickname'
                    />
                    <ProFormText
                    name='desc'
                    label = 'description'
                    placeholder= 'Please input brief introduction'
                    />
                </Col>
                <Col>
                    <Form.Item name ='avatar'>
                        <OSSImageUpload/>
                    </Form.Item>
                    
                </Col>
            </Row>
        </ProForm>
    </PageContainer>);
};

export default My;
