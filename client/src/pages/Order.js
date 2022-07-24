import { useEffect, useState } from 'react';
import Axios from 'axios';
const Order = () => {
  const location = localStorage.getItem('location');
  const userId = localStorage.getItem('id');
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    Axios.post('http://localhost:3001/getItemByCustomer', {
      location: location,
      userId: userId,
    }).then((response) => {
      setItemList(response.data);
    });
  }, []);
  return (
    <div className='container mt-5'>
      <div>Orders</div>
      <table className='table table-bordered mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Qty</th>
            <th scope='col'>Price</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope='row'>{key + 1}</th>
                <td>{val.name}</td>
                <td>{val.qty}</td>
                <td>{val.total}</td>
                <td>
                  {(() => {
                    if (val.status === 1) {
                      return <span>Waiting....</span>;
                    }
                    if (val.status === 2) {
                      return <span>Confirmed</span>
                    }
                    if (val.status === 3) {
                      return <span>Served</span>
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
