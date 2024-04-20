/* eslint-disable no-unused-vars */
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FashionProducts from "./pages/FashionProducts";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Transactions from "./pages/admin/Transaction";
import Account from "./pages/admin/Account";
import ProductControl from "./pages/admin/ProductControl";
import UserControl from "./pages/admin/UserControl";
import FoodsKasir from "./pages/kasir/Foods";
import PromoControl from "./pages/admin/PromoControl";
import SignIn from "./pages/SignIn";
import FashionsKasir from "./pages/kasir/Fashions";
import "swiper/css";
import NotFound4040 from "./pages/NotFound404";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

import { getToken } from "firebase/messaging";
import { messaging } from "./lib/FirebaseConfigure";
import axios from "axios";
import Invoice from "./pages/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/fashions",
        element: <FashionProducts />,
      },
      {
        path: "/admin/transactions",
        element: <Transactions />,
      },
      {
        path: "/admin/dashboard",
        element: <Account />,
      },
      {
        path: "/admin/product",
        element: <ProductControl />,
      },
      {
        path: "/admin/promo",
        element: <PromoControl />,
      },
      {
        path: "/admin/user",
        element: <UserControl />,
      },
      {
        path: "/admin/foods",
        element: <FoodsKasir />,
      },
      {
        path: "/admin/fashions",
        element: <FashionsKasir />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/invoice/:id",
    element: <Invoice />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound4040 />,
  },
]);

function App() {
  const { VITE_APP_VAPID_KEY, VITE_APP_DB_URL } = import.meta.env;

  async function requestPermission({ userToken, userId }) {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      axios
        .get(VITE_APP_DB_URL + "/users/" + userId, {
          headers: { Authorization: userToken },
        })
        .then((res) => {
          if (res.data.role === "admin") return;
          const oldFCMToken = res.data.FCMToken ?? [];
          if (oldFCMToken.includes(token)) return;
          axios
            .patch(
              VITE_APP_DB_URL + "/users/" + userId,
              {
                FCMToken: [...oldFCMToken, token],
              },
              {
                headers: { Authorization: userToken },
              }
            )
            .then((res) => {})
            .catch((err) => {});
        });
    } else if (permission === "denied") {
      //notifications are blocked
    }
  }

  React.useEffect(() => {
    let user;
    let stop;
    setTimeout(() => {
      if (!stop) {
        user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const token = localStorage.getItem("token");
          if (user.role === "owner") {
            requestPermission({ userToken: token, userId: user.userId });
          }
          stop = true;
        }
      }
    }, 1000);
    clearInterval();
  }, []);

  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}

export default App;
