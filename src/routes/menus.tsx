import { ShopOutlined } from "@ant-design/icons";


interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  ORG: 'org',
};

export const ROUTE_CONFIG : Record<string, IRoute> = {
  [ROUTE_KEY.ORG]:{
    path: 'org',
    name: 'Store Manage',
    icon: <ShopOutlined/>
  },
}

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];