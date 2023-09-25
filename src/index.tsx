import * as React from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}
const appRoot = createRoot(root);

appRoot.render(
  <>
    <div className={"global-title"}>React приложение</div>
  </>,
);

if (module.hot) {
  module.hot.accept();
}
