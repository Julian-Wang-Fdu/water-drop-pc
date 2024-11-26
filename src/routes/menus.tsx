import { GiftOutlined, HomeOutlined, PicRightOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";


interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  NO_ORG: 'noOrg',
  COURSE: 'course',
  PRODUCT: 'product',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG : Record<string, IRoute> = {
    [ROUTE_KEY.HOME]: {
    path: '/',
    name: 'Home',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'Personal Information',
    //hideInMenu: true,
    icon: <UserOutlined />,
  },
  [ROUTE_KEY.ORG]:{
    path: 'org',
    name: 'Store Manage',
    icon: <ShopOutlined/>
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: 'Course Manage',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: 'Product Manage',
    icon: <GiftOutlined />,
  },
  [ROUTE_KEY.NO_ORG]:{
    path: 'noOrg',
    name: 'Store Selection Remind',
    hideInMenu: true
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    hideInMenu: true,
    name: '404',
  },
}

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];