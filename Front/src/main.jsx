import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Cadastro from "./routes/Cadastro";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import PaginaPrincipal from "./routes/PaginaPrincipal";
import DashboardCadastro from "./routes/DashboardCadastroProd";
import DashboardListagemUsuarios from "./routes/DashboardListagemUsuarios";
import DashboardCadastroAdmin from "./routes/DashboardCadastrarAdmin";
import DashboaradListagemProdutos from "./routes/DashboardListagemProdutos";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Adiciona Bootstrap JS

const router = createBrowserRouter([
  {
    path: "/Cadastro",
    element: <Cadastro />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Principal",
    element: <PaginaPrincipal />,
  },
  {
    path: "/DashboardCadastro",
    element: <DashboardCadastro />,
  },
  {
    path: "/DashboardListagem",
    element: <DashboardListagemUsuarios />,
  },
  {
    path: "/DasboardCadastroAdmins",
    element: <DashboardCadastroAdmin />,
  },
  {
    path: "/DasboardListagemProdutos",
    element: <DashboaradListagemProdutos />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
