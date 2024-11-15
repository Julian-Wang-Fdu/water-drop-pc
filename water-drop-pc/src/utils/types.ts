import { IWeekCourse } from "../contianers/Course/OrderTime/constants";

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
    refetchHandler?:() => void
    currentOrg?: string
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

export interface ICourse {
  id: string;
  name: string; // 标题
  desc?: string;
  group?: string; // 适龄人群
  baseAbility?: string;
  limitNumber: number; // 限制人数
  duration: number; // 持续时长
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
  reducibleTime: IWeekCourse[];
}

export type TBaseOrganization = Partial<IOrganization>;

export type TBaseCourse = Partial<ICourse>;

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } };

export type TCourseQuery = { [key: string]: { __typename?: 'Query', data: ICourse, page: IPage } };

export type TOrgsQuery = { [key: string]: { __typename?: 'Query', data: IOrganization[], page: IPage } };

export type TOrgQuery = { [key: string]: { __typename?: 'Query', data: IOrganization } };

export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course?: ICourse;
}

export type TCardsQuery = { [key: string]: { __typename?: 'Query', data: ICard[], page: IPage } };

/**
 * 商品类型
 */
export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  coverUrl?: string;
  bannerUrl?: string;
  desc: string;
  originalPrice: number;
  stock: number;
  preferentialPrice: number;
  status: string;
}

export interface IProductType {
  key: string;
  title: string;
}

export type TProductsQuery = { [key: string]: { __typename?: 'Query', data: IProduct[], page: IPage } };

export type TProductQuery = { [key: string]: { __typename?: 'Query', data: IProduct } };

export type TProductTypeQuery = { [key: string]: { __typename?: 'Query', data: IProductType[] } };

export type TBaseProduct = Partial<IProduct>;