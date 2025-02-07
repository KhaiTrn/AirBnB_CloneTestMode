import { createContext } from "react";
import { useRoutes } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pathDefault } from "./common/path";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import HomePage from "./pages/HomePage/HomePage";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import ManagerReservation from "./pages/ManagerReservation/ManagerReservation";
import ManagerRoom from "./pages/ManagerRoom/ManagerRoom";
import ManagerUser from "./pages/ManagerUser/ManagerUser";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import SearchPage from "./pages/SearchPage/SearchPage";
import SignInAdmin from "./pages/SignInAdmin/SignInAdmin";
import { RoomDetailProvider } from "./store/RoomDetailContext";
import { SearchPageProvider } from "./store/SearchPageContext";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import ProfilePage from "./templates/HomeTemplate/components/ProfilePage";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Payment from "./pages/Payment/Payment";
import { BookingProvider } from "./store/BookingContext";
import FavoriteRoom from "./pages/Favorite/FavoriteRoom";

export const NotificationContext = createContext();

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: pathDefault.searchPage,
        element: <SearchPage />,
      },
      {
        path: pathDefault.roomDetailPage,
        element: (
          <RoomDetailProvider>
            <RoomDetail />
          </RoomDetailProvider>
        ),
      },
      {
        path: pathDefault.Profile,
        element: <ProfilePage />,
      },
      {
        path: pathDefault.favorite,
        element: <FavoriteRoom />,
      },
    ],
  },
  {
    path: pathDefault.signInAdmin,
    element: <SignInAdmin />,
  },
  {
    path: pathDefault.admin,
    element: <AdminTemplate />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: pathDefault.dashBoard, element: <DashBoard /> },
      {
        path: pathDefault.managerUser,
        element: <ManagerUser />,
      },
      {
        path: pathDefault.managerLocation,
        element: <ManagerLocation />,
      },
      {
        path: pathDefault.managerReservation,
        element: <ManagerReservation />,
      },
      {
        path: pathDefault.managerRoom,
        element: <ManagerRoom />,
      },
    ],
  },
  {
    path: pathDefault.AuthPage,
    element: <AuthPage />,
  },
  {
    path: pathDefault.payment,
    element: <Payment />,
  },
];

function App() {
  const handleNotification = (type, content, timeClose = 3000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const routes = useRoutes(arrRoutes);
  return (
    <>
      <SearchPageProvider>
        <BookingProvider>
          <NotificationContext.Provider value={{ handleNotification }}>
            {routes}
            <ToastContainer />
          </NotificationContext.Provider>
        </BookingProvider>
      </SearchPageProvider>
    </>
  );
}

export default App;
