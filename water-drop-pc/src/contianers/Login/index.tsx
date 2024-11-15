import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs,  theme } from 'antd';
import styles from './index.module.less'
import logo from '../../assets/logo.svg'
import Space from 'antd/lib/space';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/auth';
import { AUTH_TOKEN } from '../../utils/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '../../hooks';
import { useUserContext } from '../../hooks/userHook';

interface IValue{
  account: string;
  password: string;
  autoLogin:boolean;
}

export default () => {
  useTitle('Login')
  const { token } = theme.useToken();
  const [login] = useMutation(LOGIN);
  //find origin path 
  const [params] = useSearchParams()
  const nav = useNavigate()
  const {store} = useUserContext()
  const loginHandler = async(values:IValue)=>{
    const res = await login({
      variables: values
    });
    const result = res.data.login
    if(result.code === 200){
      store.refetchHandler?.()
      if(values.autoLogin){
        sessionStorage.setItem(AUTH_TOKEN,'')
        localStorage.setItem(AUTH_TOKEN,result.data)
      }else{
        sessionStorage.setItem(AUTH_TOKEN,result.data)
        localStorage.setItem(AUTH_TOKEN,'')
      }
      
      message.success(result.message)
      nav(params.get('orgUrl') || '/')
      return
    }else{
      message.error(result.message)
    }
    console.log('res',res)
  };

return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
          logo={logo}
          title={<span style={{color: 'blue'}}>Water-Drop</span>}
          subTitle={<span style={{color: 'blue'}}>There is no end to learning</span>}
          submitter ={{searchConfig:{submitText: 'Login'}}}
          onFinish={loginHandler}
          actions={
            <Space style={{color: 'blue', fontSize: '12px'}}>
              New account will be created after first login
            </Space>
          }
        >
          <Tabs
            centered
            items = {
              [
                {
                  key: 'account',
                  label: 'Account Login'
                }
              ]
            }
          />
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'account: admin or user'}
                rules={[
                  {
                    required: true,
                    message: 'please input account!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    'Password should contain numbers, letters and special characters, at least 8 characters long.',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          strength：medium
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          strength：strong
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>strength：weak</div>
                    );
                  },
                }}
                placeholder={'password: '}
                rules={[
                  {
                    required: true,
                    message: 'please input password！',
                  },
                ]}
                
              />
         
          

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin"
              style={{
                float: 'left',
                }}
            >
              auto-login
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};