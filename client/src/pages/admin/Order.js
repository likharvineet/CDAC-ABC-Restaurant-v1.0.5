import { useEffect, useState } from 'react';
import Axios from 'axios';
const Order = () => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/getAllOrder').then((response) => {
      setItemList(response.data);
    });
  }, [itemList]);
  const changeStatus = (status, id) => {
    Axios.put('http://localhost:3001/updateStatus', {
      statusUpdate: status,
      id: id,
    }).then(() => {
      console.log('Order Status Updated');
    });
  };
  return (
    <div className='container mt-5'>
      <div>Orders</div>
      <table className='table table-bordered mt-2'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Location</th>
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
                <td>{val.location}</td>
                <td>{val.name}</td>
                <td>{val.qty}</td>
                <td>{val.total}</td>
                <td>
                  {(() => {
                    if (val.status === 1) {
                      return (
                        <button
                          className='btn btn-outline-info'
                          onClick={() => changeStatus(val.status, val.id)}
                        >
                          Confirm
                        </button>
                      );
                    }
                    if (val.status === 2) {
                      return (
                        <button
                          className='btn btn-warning'
                          onClick={() => changeStatus(val.status, val.id)}
                        >
                          In Process
                        </button>
                      );
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
