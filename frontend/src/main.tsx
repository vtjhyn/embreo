import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";

import AntConfig from "./config/AntConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AntConfig>
        <RouterProvider router={router} />
      </AntConfig>
    </Provider>
  </React.StrictMode>
);
