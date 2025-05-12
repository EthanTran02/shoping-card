import Home from "../components/Home";
import Root from "../components/Root";
import Shop from "../components/Shop";
import ErrorPage from "../components/ErrorPage";
import Men from "../components/categories/Men";
import Women from "../components/categories/Women";
import Jewelery from "../components/categories/Jewelery";
import ItemDetail from "../components/categories/detail/ItemDetail";
import Cart from "../components/Cart";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
        children: [
          {
            index: true,
            element: <Men />,
          },
          {
            path: "women",
            element: <Women />,
          },
          {
            path: "jewelery",
            element: <Jewelery />,
          },
          {
            path: "item/:id",
            element: <ItemDetail />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
