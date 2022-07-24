import { Route, Routes } from 'react-router-dom';
import './App.css';
import Location from './pages/Location';
import Order from './pages/Order';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Registration />} />
        <Route exact path='/logout' element={<Logout />} />
        <Route
          exact
          path='/'
          element={<ProtectedRoute Component={Location} />}
        />
        <Route
          exact
          path='/order'
          element={<ProtectedRoute Component={Order} />}
        />
        <Route
          exact
          path='/menu'
          element={<ProtectedRoute Component={Menu} />}
        />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
