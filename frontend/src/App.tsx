import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { ProtectedRoute } from "./components/auth/protected-route";
import { LoginPage } from "./pages/login";
import { PublicRoute } from "./components/auth/public-route";
import { AppLayout } from "./components/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route index path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Route>
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
