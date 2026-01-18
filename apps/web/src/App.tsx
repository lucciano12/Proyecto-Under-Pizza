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
      <div className="dashboard">
        <div className="center-column">
          <CreateProductForm onSuccess={handleSuccess} />
        </div>
        <div className="right-column">
          <ProductList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
