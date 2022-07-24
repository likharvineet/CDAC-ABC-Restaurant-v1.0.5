import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <ul className='nav justify-content-center'>
        <li className='nav-item'>
          <Link className='nav-link' to='/admin/'>
            Order
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/admin/menu'>
            Menu
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/admin/location'>
            Location
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
