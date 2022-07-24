import { useState, useEffect } from 'react';
import Axios from 'axios';
const Menu = () => {
  const location = localStorage.getItem('location');
  const userId = localStorage.getItem('id');
  const [quantity, setQuantity] = useState(0);
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/getItem').then((response) => {
      setItemList(response.data);
    });
  }, []);

  const orderItem = (props) => {
    const [id, price, quantity] = props;
    Axios.post('http://localhost:3001/addOrderCustomer', {
      customerId: userId,
      location: location,
      itemId: id,
      price: price,
      quantity: quantity,
    }).then(() => {
      console.log('Menu Added');
    });
  };
  return (
    <div className='container-fluid'>
      <div>ABC Restaurant, {location}</div>
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
              <th scope='col'>Qty</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th scope='row'>{key + 1}</th>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>
                    <input
                      type='number'
                      min='0'
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn btn-outline-danger'
                      onClick={() => orderItem([val.id, val.price, quantity])}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Menu;
