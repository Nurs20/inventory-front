import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import SaleHistoryPage from "./pages/SaleHistory";
import ProductPage from "./pages/Product";
import ForecastPage from "./pages/Forecast";
import PurchasePage from "./pages/Purchase";
import Header from "./components/header/Header";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SalePage from "./pages/Sale";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/sale-history"
            element={
              <PrivateRoute roles={"manager"}>
                <SaleHistoryPage />
              </PrivateRoute>
            }
          />
          <Route path="/product" element={<ProductPage />} />
          <Route
            path="/forecast"
            element={
              <PrivateRoute roles={"manager"}>
                <ForecastPage />
              </PrivateRoute>
            }
          />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/sale" element={<SalePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
