import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [orderId, setOrderId] = useState();
  useEffect(() => {
    setTotalPay(localStorage.getItem('totalPrice'));
    setOrderId(localStorage.getItem('orderId'));
  }, []);
  const paymentUpdate = () => {
    Axios.put('http://localhost:3001/updatePayment', {
      orderId: orderId,
      paymentType: mode,
    }).then(() => {
      console.log('Payment Updated');
      navigate('/order');
    });
  };
  return (
    <>
      <section className='py-4 container'>
        <div className='row justify-content-center'>
          <div className='form-check col-11 col-md-6 col-lg-3 mx-0 mb-4'>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              value='1'
              id='flexRadioDefault1'
              onChange={(e) => {
                setMode(e.target.value);
              }}
            />
            <label
              className='col-11 col-md-6 col-lg-3 mx-0 mb-4 w-100'
              htmlFor='flexRadioDefault1'
            >
              <div className='card p-0 overflow-hidden h-100 shadow'>
                <div className='card-body'>
                  <h5 className='card-title'>Cash</h5>
                </div>
              </div>
            </label>
          </div>
          <div className='form-check col-11 col-md-6 col-lg-3 mx-0 mb-4'>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault2'
              value='2'
              onChange={(e) => {
                setMode(e.target.value);
              }}
            />
            <label
              className='col-11 col-md-6 col-lg-3 mx-0 mb-4 w-100'
              htmlFor='flexRadioDefault2'
            >
              <div className='card p-0 overflow-hidden h-100 shadow'>
                <div className='card-body'>
                  <h5 className='card-title'>Card</h5>
                </div>
              </div>
            </label>
          </div>
        </div>
        <button className='btn btn-outline-success' onClick={paymentUpdate}>
          Pay : &#8377;{totalPay}
        </button>
      </section>
    </>
  );
};

export default Payment;
