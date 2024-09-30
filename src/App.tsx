import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MainLayout from "./layouts/MainLayout";
import { HomePage } from "./modules/home/page/HomePage";
import theme from "./theme/theme";
import { useAuth } from "./modules/auth/hooks/useAuth";
import { ReactElement } from "react";
import { LoginPage } from "./modules/auth/pages/LoginPage";

// Componente para rutas privadas
interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authState } = useAuth();

  if (!authState) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para rutas públicas
interface PublicRouteProps {
  children: ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { authState } = useAuth();

  // Si el usuario está autenticado, redirige a la página principal
  if (authState) {
    return <Navigate to="/home" replace />;
  }

  // Si no está autenticado, muestra el componente de login
  return children;
};

// Configuración del enrutador
const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "home", element: <HomePage /> },
      { path: "/", element: <Navigate to="/home" replace /> },
      { path: "*", element: <Navigate to="/home" replace /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
