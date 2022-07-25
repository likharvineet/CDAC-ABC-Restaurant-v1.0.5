import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import ItemCard from '../components/ItemCard';
import { useNavigate } from 'react-router-dom';
const Menu = () => {
  const navigate = useNavigate();
  const location = localStorage.getItem('location');
  const userId = localStorage.getItem('id');
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/getItem').then((response) => {
      setItemList(response.data);
    });
  }, []);

  const toCheckOut = () => {
    const orderId = uuidv4();
    Axios.post('http://localhost:3001/addOrderCustomer', {
      customerId: userId,
      location: location,
      orderList: JSON.stringify(cart),
      price: totalPrice,
      orderId: orderId,
    }).then(() => {
      console.log('Menu Added');
      localStorage.setItem('orderList', JSON.stringify(cart));
      localStorage.setItem('totalPrice', totalPrice);
      localStorage.setItem('orderId', orderId);
      navigate('/checkout');
    });
  };
  const [cart, setCart] = useState([]);
  const handleClick = (item, quantity) => {
    item.quantity = parseInt(quantity);

    if (!cart.find((obj) => obj.id === item.id)) {
      setTotalPrice(item.price * item.quantity + totalPrice);
      setCart([...cart, item]);
    }
  };
  return (
    <>
      <h1 className='text-center mt-3'>All Items of {location}</h1>
      <section className='py-4 container'>
        <div className='row justify-content-center'>
          {itemList.map((item) => {
            return (
              <ItemCard key={item.id} item={item} handleClick={handleClick} />
            );
          })}
        </div>
        <button className='btn btn-outline-primary' onClick={toCheckOut}>
          Place Order of Amount : &#8377;{totalPrice}
        </button>
        {console.log(JSON.stringify(cart))}
      </section>
    </>
  );
};
export default Menu;
