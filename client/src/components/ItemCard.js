import { useState } from 'react';

const ItemCard = ({ item, handleClick }) => {
  const { name, item_type, price } = item;
  const [quantity, setQuantity] = useState(0);
  let type = <span></span>;
  if (item_type === 1) {
    type = <span className='fs-6 fst-italic text-success'>(Veg)</span>;
  }
  if (item_type === 2) {
    type = <span className='fs-6 fst-italic text-danger'>(Non-Veg)</span>;
  }

  return (
    <div className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
      <div className='card p-0 overflow-hidden h-100 shadow'>
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{type}</p>
          <p className='card-text'>&#8377;{price}</p>
          <p className='card-text'>
            <input
              className='form-control'
              type='number'
              min='0'
              placeholder='0'
              onChange={(e) => setQuantity(e.target.value)}
            />
          </p>
          <button className='btn btn-success' onClick={() => handleClick(item, quantity)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
