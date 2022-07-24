import { useEffect, useState } from 'react';
import LocationComponent from '../components/LocationComponent';
import Axios from 'axios';

const Location = () => {
  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/get_location').then((response) => {
      setLocationList(response.data);
    });
  }, []);
  return (
    <div className='container mt-5'>
      <div className='row'>
        {locationList.map((val, key) => {
          return (
            <div className='m-2 col-sm-3' key={val.id}>
              <LocationComponent id = {val.id} locationName={val.location} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Location;
