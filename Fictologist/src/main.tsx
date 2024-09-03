import * as React from "react";
import * as ReactDom from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import './App.css';
import Home from './routes/Home';
import Test from './routes/TestPage';
import Sidebar from "./components/Sidebar";

function AppLayout() {
  return (
  <>
    <Sidebar />
    <Outlet />
  </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "test",
        element: <Test/>
      }
    ]
  }
]);

ReactDom.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
