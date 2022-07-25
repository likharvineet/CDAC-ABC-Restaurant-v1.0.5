import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    setOrderList(JSON.parse(localStorage.getItem('orderList')));
    setTotalPrice(localStorage.getItem('totalPrice'));
  }, []);
  const payment = () => {
    navigate('/payment');
  };
  return (
    <div className='container mt-5'>
      <div>Order List</div>
      <table className='table table-bordered mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Qty</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope='row'>{key + 1}</th>
                <td>{val.name}</td>
                <td>{val.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className='btn btn-outline-primary' onClick={payment}>
        Checkout : &#8377;{totalPrice}
      </button>
    </div>
  );
};

export default Checkout;
