import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./App.css";
import App from "./App.jsx";
import "./index.css";
import store from "./Redux/store.js";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // </React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
);
