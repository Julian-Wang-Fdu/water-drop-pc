import NoOrg from "../components/NoOrg";
import Course from "../contianers/Course";
import Home from "../contianers/Home";
import My from "../contianers/My";
import Org from "../contianers/org";
import Page404 from "../contianers/Page404";
import { ROUTE_KEY } from "./menus";


export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]:Org,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.NO_ORG]:NoOrg,
  [ROUTE_KEY.PAGE_404]: Page404,
};