import { useEffect, useState } from 'react';
import Axios from 'axios';
const Order = () => {
  const location = localStorage.getItem('location');
  const orderId = localStorage.getItem('orderId');
  const [itemList, setItemList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    Axios.post('http://localhost:3001/getItemByCustomer', {
      location: location,
      orderId: orderId,
    }).then((response) => {
      setOrderList(response.data[0]);
      setItemList(JSON.parse(response.data[0].orderList));
    });
  }, []);
  return (
    <div className='container mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-6 text-start'>
            <span className='fw-bold'>Order ID :</span> {orderList.orderId}
          </div>
          <div className='col-6 text-end'>
            <span className='fw-bold'>Total :</span> &#8377;{orderList.total}
          </div>
        </div>
        <div className='row'>
          <div className='col-6 text-start'>
            <span className='fw-bold'>Location :</span> {orderList.location}
          </div>
          <div className='col-6 text-end'>
            <span className='fw-bold'>Payment Mode :</span>
            {(() => {
              if(orderList.payment_type === 1) {
                return <span> Cash</span>
              }
              if(orderList.payment_type === 2) {
                return <span> Card</span>
              }
            })()}
          </div>
        </div>
      </div>
      <table className='table table-bordered mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Type</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Status</th>
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
                      return <span className='text-success'>Veg</span>;
                    }
                    if (val.item_type === 2) {
                      return <span className='text-danger'>Non-Veg</span>;
                    }
                  })()}
                </td>

                <td>{val.quantity}</td>
                <td>
                  {(() => {
                    if (orderList.status === 1) {
                      return <span>Waiting....</span>;
                    }
                    if (orderList.status === 2) {
                      return <span>Confirmed</span>;
                    }
                    if (orderList.status === 3) {
                      return <span>Delivered</span>;
                    }
                  })()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
