import { useEffect, useState } from 'react';
import Axios from 'axios';

const Menu = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemList, setItemList] = useState([]);

  const addItem = () => {
    Axios.post('http://localhost:3001/addItem', {
      itemName: itemName,
      itemType: itemType,
      itemPrice: itemPrice,
    }).then(() => {
      console.log('Menu Inserted');
    });
  };
  useEffect(() => {
    Axios.get('http://localhost:3001/getItem').then((response) => {
      setItemList(response.data);
    });
  }, [itemList]);
  function deleteItem(id) {
    Axios.put('http://localhost:3001/deleteItem', {
      statusUpdate: 0,
      id: id,
    }).then(() => {
      console.log('Menu Deleted');
    });
  }
  return (
    <div className='container mt-5'>
      <div>Add Menu</div>
      <div className='pt-3 col-lg-12 container'>
        <div className='row col-md-12'>
          <div className='col'>
            <input
              type='text'
              placeholder='Name'
              className='form-control'
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
          </div>
          <div className='col'>
            <select
              className='form-control'
              onChange={(e) => {
                setItemType(e.target.value);
              }}
            >
              <option value='0'>...</option>
              <option value='1'>Veg</option>
              <option value='2'>Non-Veg</option>
            </select>
          </div>
          <div className='col input-group mb-3'>
            <span className='input-group-text'>&#8377;</span>
            <input
              type='text'
              className='form-control'
              onChange={(e) => {
                setItemPrice(e.target.value);
              }}
            />
            <span className='input-group-text'>.00</span>
          </div>
        </div>
        <button className='btn btn-primary mt-3' onClick={addItem}>
          Add
        </button>
      </div>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Type</th>
            <th scope='col'>Price</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope='row'>{key + 1}</th>
                <td>{val.name}</td>
                <td>
                  {(() => {
                    if (val.item_type === 1) {
                      return <span className='text-success fw-bold'>Veg</span>;
                    }
                    if (val.item_type === 2) {
                      return (
                        <span className='text-danger fw-bold'>Non-Veg</span>
                      );
                    }
                  })()}
                </td>
                <td>{val.price}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => {
                      deleteItem(val.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
