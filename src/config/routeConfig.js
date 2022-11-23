import {
  Home,
  Login,
  Register,
  RegisterSeat,
  SortSeat,
  Map,
  UpdateGraList,
} from "../pages";
import routes from "../routes";

const publicRoute = [
  { path: routes.home, element: <Home></Home> },
  { path: routes.map, element: <Map></Map> },
  { path: routes.login, element: <Login></Login> },
  { path: routes.adminLogin, element: <Login></Login> },
  { path: routes.register, element: <Register></Register> },
  { path: routes.registerSeat, element: <RegisterSeat></RegisterSeat> },
];

const privateRoute = [
  { path: routes.sortSeat, element: <SortSeat></SortSeat> },
  { path: routes.updateGraList, element: <UpdateGraList></UpdateGraList> },
];

export { publicRoute, privateRoute };
