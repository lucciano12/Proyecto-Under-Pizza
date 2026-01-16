import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { IProduct } from '@rotulos/shared'; // Use import type
import { MovementType } from '@rotulos/shared';
import { v4 as uuidv4 } from 'uuid';

export const ProductDetail: React.FC = () => {
  const { qrId } = useParams<{ qrId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false); // Debounce

  useEffect(() => {
    if (qrId) loadProduct(qrId);
  }, [qrId]);

  const loadProduct = async (id: string) => {
    try {
      const p = await api.getProductByQr(id);
      setProduct(p);
    } catch (e) {
      alert('Product not found');
      navigate('/');
    }
  };

  const handleMovement = async (type: MovementType) => {
    if (!product || blocked) return;
    setBlocked(true);
    setLoading(true);

    try {
      await api.createMovement({
        clientRequestId: uuidv4(),
        productId: product._id!,
        type,
        quantity: 1,
        performedBy: 'PWA User'
      });
      alert(`Movement ${type} Registered!`);
      await loadProduct(qrId!);
    } catch (error) {
      console.error(error);
      alert('Error registering movement');
    } finally {
      setLoading(false);
      setTimeout(() => setBlocked(false), 3000);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="detail-container">
      <h1 className="title">{product.name}</h1>
      <p className="category">{product.category}</p>

      <div className="stock-card">
        <span className="stock-label">Current Stock</span>
        <span className="stock-value">{product.currentStock}</span>
      </div>

      <div className="action-buttons">
        <button
          onClick={() => handleMovement(MovementType.IN)}
          disabled={blocked || loading}
          className={`btn-action btn-in ${(blocked || loading) ? 'btn-blocked' : ''}`}
        >
          ENTRY (+)
        </button>
        <button
          onClick={() => handleMovement(MovementType.OUT)}
          disabled={blocked || loading}
          className={`btn-action btn-out ${(blocked || loading) ? 'btn-blocked' : ''}`}
        >
          EXIT (-)
        </button>
      </div>

      <button onClick={() => navigate('/')} className="btn-back">
        Scan Another
      </button>

      {blocked && <p style={{ fontSize: '0.8rem', color: '#999' }}>Wait 3s...</p>}
    </div>
  );
};
