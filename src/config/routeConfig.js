
import {
  Home,
  Login,
  Register,
  RegisterSeat,
  SortSeat,
  Map,
  UpdateGraList,
  EventManager,
  CreateEvent,
  UserEventManager,
  UserManager,FeedBack
} from "../pages";
import routes from "../routes";

const publicRoute = [
  { path: routes.home, element: <Home></Home> },
  { path: routes.map, element: <Map></Map> },
  { path: routes.login, element: <Login></Login> },
  { path: routes.adminLogin, element: <Login></Login> },
  { path: routes.register, element: <Register></Register> },
  { path: routes.registerSeat, element: <RegisterSeat></RegisterSeat> },
  { path: routes.userEventManager, element: <UserEventManager></UserEventManager> },
  { path: routes.feedBack, element: <FeedBack></FeedBack> },
  { path: routes.createEvent, element: <CreateEvent></CreateEvent> },

];

const privateRoute = [
  { path: routes.sortSeat, element: <SortSeat></SortSeat> },
  { path: routes.updateGraList, element: <UpdateGraList></UpdateGraList> },
  { path: routes.eventManager, element: <EventManager></EventManager> },
  { path: routes.userManager, element: <UserManager></UserManager> },
];

export { publicRoute, privateRoute };
