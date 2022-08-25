import {Home,Login,Register, RegisterSeat, SortSeat} from '../pages'
import routes from '../routes'

const publicRoute = [
    { path: routes.home, element: <Home></Home> },
    { path: routes.login, element: <Login></Login> },
    { path: routes.register, element: <Register></Register> },
    { path: routes.registerSeat, element: <RegisterSeat></RegisterSeat> },
    { path: routes.sortSeat, element: <SortSeat></SortSeat> },
]

const privateRoute = []

export {publicRoute,privateRoute}