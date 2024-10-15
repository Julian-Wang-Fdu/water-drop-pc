export interface IPropChild {
  children: React.ReactNode;
}

//User type
export interface IUser{
    id:string
    account:string
    name: string
    desc:string
    avatar:string
}

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface IMedia {
  id: string;
  url: string;
  remark: string;
}

//Store type
export interface IOrganization {
  id: string;
  orgFrontImg?: IMedia[];
  orgRoomImg?: IMedia[];
  orgOtherImg?: IMedia[];
  name: string;
  logo: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
  identityCardBackImg:string
  identityCardFrontImg:string
  businessLicense:string
}

export type TBaseOrganization = Partial<IOrganization>;

export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };