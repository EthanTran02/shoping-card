import Home from "../components/Home";
import Root from "../components/Root";
import Shop from "../components/Shop";
import ErrorPage from "../components/ErrorPage";

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
      },
    ],
  },
];

export default routes;
