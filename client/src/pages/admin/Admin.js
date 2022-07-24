import { Route, Routes } from 'react-router-dom';
import Location from './Location';
import Menu from './Menu';
import NavBar from './NavBar';
import Order from './Order';

const Admin = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Order />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/location' element={<Location />} />
      </Routes>
    </div>
  );
};

export default Admin;
