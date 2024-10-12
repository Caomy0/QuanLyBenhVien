import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store"; // Đảm bảo rằng đường dẫn tới store là đúng
import "./tailwind.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
