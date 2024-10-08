import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { register } from "swiper/element/bundle";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// @ts-ignore
import { PersistGate } from "redux-persist/integration/react";

import { store, persistedStore } from "./store/store";

register();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
