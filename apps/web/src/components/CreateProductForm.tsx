import React, { useState } from 'react';
import { api } from '../services/api';

export const CreateProductForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [issuedAt, setIssuedAt] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProduct({
        name,
        category,
        initialQuantity: 0,
        isActive: true,
        issuedAt: issuedAt ? new Date(issuedAt).toISOString() : undefined,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined
      });
      setName('');
      setCategory('');
      setIssuedAt('');
      setExpiresAt('');
      alert('Product Created!');
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3 className="form-title">Crear Rótulos</h3>
      <div className="form-grid">
        <div className="input-group">
          <label className="input-label">Nombre del producto</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Categoría</label>
          <input
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Fecha de inicio</label>
          <input
            type="date"
            value={issuedAt}
            onChange={e => setIssuedAt(e.target.value)}
            className="input"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Fecha de vencimiento</label>
          <input
            type="date"
            value={expiresAt}
            onChange={e => setExpiresAt(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="btn-create">
          Crear
        </button>
      </div>
    </form>
  );
};
