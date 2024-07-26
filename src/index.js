import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./components/CheckoutPage/Checkout";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login";
import ProductPage from "./components/ProductsPage/ProductPage";
import store from "./components/redux/store";
import Register from "./components/Register";
import "./index.css";
import ErrorPage from "./miscellaneousPages/ErrorPage";
import reportWebVitals from "./reportWebVitals";

let persistor = persistStore(store);

// const clearLocalStorage = ()=>{
//   persistor.pause();
//   persistor.flush().then(() => {
//     return persistor.purge();
//   });
// }

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

//note another way to nest checkout in cart is to use outlet and make checkout the children of cart

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={appRouter} />
      <Toaster
        toastOptions={{
          className: "font-semibold tracking-wide",
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
