import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import SaleHistoryPage from './pages/SaleHistory';
import ProductPage from './pages/Product';
import ForecastPage from './pages/Forecast';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/sale-history" element={<SaleHistoryPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
