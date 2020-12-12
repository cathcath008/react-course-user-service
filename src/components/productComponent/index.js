import { findAllByDisplayValue } from '@testing-library/react';
import React from 'react';
import './product.css';

const ProductComponent = ({ data }) => {
  console.log('product', data);
  return (
    <div
      className="card"
      style={{
        margin: '10px',
      }}
    >
      <div className="card-body">
        <h2 className="card-title" style={{ color: 'blue' }}>
          {data.name}
        </h2>
        <h6 style={{ color: 'black' }}>{data.description}</h6>
        <p className="card-text">{data.display_price}</p>
        <a href="/" className="card-link">
          Detail
        </a>
      </div>
    </div>
  );
};

export default ProductComponent;
