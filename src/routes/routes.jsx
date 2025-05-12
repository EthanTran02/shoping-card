import Home from "../components/Home";
import Root from "../components/Root";
import Shop from "../components/Shop";
import ErrorPage from "../components/ErrorPage";
import Men from "../components/categories/Men";
import Women from "../components/categories/Women";
import Jewelery from "../components/categories/Jewelery";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
        children: [
          {
            path: "men",
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
        ],
      },
    ],
  },
];

export default routes;
