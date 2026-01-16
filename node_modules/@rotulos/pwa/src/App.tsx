import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Scanner } from './components/Scanner';
import { ProductDetail } from './components/ProductDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/product/:qrId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
