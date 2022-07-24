import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Main.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const signin = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        // setLoginUser(response.data[0].username);
        localStorage.setItem('login', true);
        localStorage.setItem('username', response.data[0].username);
        localStorage.setItem('id', response.data[0].id);
      }
    });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn) {
        setLoginUser(response.data.user[0].username);
      }
      const login = localStorage.getItem('login');
      if (login) {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='center'>
      <ul className='nav nav-pills nav-justified mb-3' id='ex1' role='tablist'>
        <li className='nav-item' role='presentation'>
          <Link
            className='nav-link active'
            id='tab-login'
            data-mdb-toggle='pill'
            to='/login'
            role='tab'
            aria-controls='pills-login'
            aria-selected='true'
          >
            Login
          </Link>
        </li>
        <li className='nav-item' role='presentation'>
          <Link
            className='nav-link'
            id='tab-register'
            data-mdb-toggle='pill'
            to='/register'
            role='tab'
            aria-controls='pills-register'
            aria-selected='false'
          >
            Register
          </Link>
        </li>
      </ul>

      <div className='tab-content'>
        <div
          className='tab-pane fade show active'
          id='pills-login'
          role='tabpanel'
          aria-labelledby='tab-login'
        >
          <form>
            <div className='form-outline mb-4'>
              <input
                type='email'
                id='loginName'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className='form-label' htmlFor='loginName'>
                Email
              </label>
            </div>

            <div className='form-outline mb-4'>
              <input
                type='password'
                id='loginPassword'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className='form-label' htmlFor='loginPassword'>
                Password
              </label>
            </div>

            <button
              type='submit'
              className='btn btn-primary btn-block mb-4'
              onClick={signin}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
