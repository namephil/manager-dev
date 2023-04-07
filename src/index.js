// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

// const root = ReactDOM.createRoot(document.querySelector("#root"))
// root.render(<App />)
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);