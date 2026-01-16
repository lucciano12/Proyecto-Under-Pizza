import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { IProduct } from '@rotulos/shared';
import { QRCodeSVG } from 'qrcode.react';


export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const list = await api.getProducts();
      setProducts(list);
    } catch (error) {
      console.error('Failed to load products', error);
    }
  };

  const handlePrint = (productId: string) => {
    const element = document.getElementById(`qr-${productId}`);
    if (element && window.html2pdf) {
      const opt = {
        margin: 1,
        filename: `product-${productId}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };
      window.html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="product-meta">{p.category}</p>
              <p className="product-meta">QR ID: {p.qrId}</p>
            </div>
            <div className="qr-section">
              <div id={`qr-${p.qrId}`} className="qr-container">
                <QRCodeSVG value={p.qrId} size={100} />
                <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '4px' }}>{p.name}</div>
              </div>
              <button
                onClick={() => handlePrint(p.qrId)}
                className="btn-print"
              >
                Print PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
