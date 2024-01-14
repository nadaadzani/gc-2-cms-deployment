import { redirect, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import RootLayout from "./layouts/RootLayout";
import CreateProduct from "./views/CreateProduct";
import EditProduct from "./views/EditProduct";
import CategoryTable from "./views/CategoryTable";
import Register from "./views/Register";
import PatchProduct from "./views/PatchProduct";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) throw redirect("/");
      return null;
    },
  },
  {
    path: "/add-staff",
    element: <Register />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return null; // alias home
      }

      throw redirect("/login");
    },
  },

  {
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return null; // alias home
      }

      throw redirect("/login"); // jika loginnya salah
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add/product",
        element: <CreateProduct />,
      },
      {
        path: "/edit/product/:id",
        element: <EditProduct />,
      },
      {
        path: "/categories",
        element: <CategoryTable />,
      },
      {
        path: "/patch/product/:id",
        element: <PatchProduct />,
      },
    ],
  },
]);
