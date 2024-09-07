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
import Template from './routes/TemplatePage';
import AddPage from "./routes/AddPage";
import Sidebar from "./components/Sidebar";
import AddButton from "./components/AddButton";
import SearchBar from "./components/SearchBar";

function AppLayout() {
  return (
  <>
    <div className="page-layout">
      <Sidebar />
      <Outlet />
    </div>

    <AddButton />
    <SearchBar />
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
      },
      {
        path: "template",
        element: <Template/>
      },
      {
        path: "add",
        element: <AddPage/>
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
