
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/userHook';
import logo from '../../assets/logo.svg'
import { AUTH_TOKEN } from '../../utils/constants';
import { ROUTE_KEY, routes } from '../../routes/menus';
import { useGoTo } from '../../hooks';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import OrgSelect from '../OrgSelect/OrgSelect';


const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

/**
*
*/
const Layout  = () => {
    const outlet = useOutlet()
    const {store} = useUserContext()
    const nav = useNavigate()
    const { go } = useGoTo()
    const logout = ()=>{
        sessionStorage.setItem(AUTH_TOKEN,'')
        localStorage.setItem(AUTH_TOKEN,'')
        nav('/login')
    }
    const goToOrg=()=>{
        go(ROUTE_KEY.ORG)
    }

    return (
        <ProLayout
            layout='mix'
            avatarProps={
                {
                    src: store.avatar || null,
                    title: store.name,
                    size: 'small',
                    onClick: ()=> go(ROUTE_KEY.MY)
                }
            }
            links={[
                <Space size={20} onClick={logout}>
                    <LogoutOutlined/>
                    Exit
                </Space>
            ]}
            title = 'Water Drop'
            logo = {logo}
            route = {{
                path: '/',
                routes: routes
            }}
            actionsRender={()=>[
                <OrgSelect/>,
                <Tooltip title = "Store manage">
                    <ShopOutlined onClick={goToOrg}/>
                </Tooltip>
            ]}
            menuItemRender = {menuItemRender}
            //click the header will go back to home page
            onMenuHeaderClick={()=>nav('/')}
        >
            {outlet}
        </ProLayout>
    );
};

export default Layout ;
