import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './Main.css';

function Registration() {
  const [nameReg, setNameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const navigate = useNavigate();
  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: nameReg,
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };
  useEffect(() => {
    const login = localStorage.getItem('login');
    if (login) {
      navigate('/');
    }
  }, []);

  return (
    <div className='center'>
      <ul className='nav nav-pills nav-justified mb-3' id='ex1' role='tablist'>
        <li className='nav-item' role='presentation'>
          <Link
            className='nav-link'
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
            className='nav-link active'
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
          id='pills-register'
          role='tabpanel'
          aria-labelledby='tab-register'
        >
          <form>
            <div className='form-outline mb-4'>
              <input
                type='text'
                id='registerName'
                className='form-control'
                onChange={(e) => {
                  setNameReg(e.target.value);
                }}
              />
              <label className='form-label' htmlFor='registerName'>
                Name
              </label>
            </div>

            <div className='form-outline mb-4'>
              <input
                type='email'
                id='registerEmail'
                className='form-control'
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
              <label className='form-label' htmlFor='registerEmail'>
                Email
              </label>
            </div>

            <div className='form-outline mb-4'>
              <input
                type='password'
                id='registerPassword'
                className='form-control'
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
              <label className='form-label' htmlFor='registerPassword'>
                Password
              </label>
            </div>

            <button
              type='submit'
              className='btn btn-primary btn-block mb-3'
              onClick={register}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
