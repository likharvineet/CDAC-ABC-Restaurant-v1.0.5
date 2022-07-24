import { useEffect, useState } from 'react';
import Axios from 'axios';
const Location = () => {
  const [location, setLocation] = useState('');
  const [locationList, setLocationList] = useState([]);
  const deleteStatus = 0;
  const addLocation = () => {
    Axios.post('http://localhost:3001/create_location', {
      location: location,
    }).then(() => {
      console.log('Location Added');
    });
  };
  useEffect(() => {
    Axios.get('http://localhost:3001/get_location').then((response) => {
      setLocationList(response.data);
    });
  }, [locationList]);
  function deleteLocation(id) {
    Axios.put('http://localhost:3001/update_location', {
      statusUpdate: deleteStatus,
      id: id,
    }).then(() => {
      console.log('Location Deleted');
    });
  }
  return (
    <div className='container col-md-6 mt-5'>
      <div>Add Locaiton</div>
      <div className='input-group mb-3 pt-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Locaiton'
          aria-label='Location'
          aria-describedby='button-addon2'
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <button
          className='btn btn-outline-primary'
          type='button'
          id='button-addon2'
          onClick={addLocation}
        >
          Add
        </button>
      </div>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Location</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {locationList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope='row'>{key + 1}</th>
                <td>{val.location}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => {
                      deleteLocation(val.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Location;
