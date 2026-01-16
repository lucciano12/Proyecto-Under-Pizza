import { useState } from 'react';
import { CreateProductForm } from './components/CreateProductForm';
import { ProductList } from './components/ProductList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1 className="title">Rótulos QR Dashboard</h1>
      <div className="dashboard">
        <CreateProductForm onSuccess={handleSuccess} />
        <ProductList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;
