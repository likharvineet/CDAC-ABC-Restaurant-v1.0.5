import { useNavigate } from "react-router-dom";

const LocationComponent = (props) => {
    const navigate = useNavigate();
  const setId = (id) => {
    localStorage.setItem('location', id);
    navigate('/menu');
  };
  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{props.locationName}</h5>
        <p className='card-text'>Visit to enjoy delicious and authentic food</p>
        <button
          className='btn btn-primary'
          onClick={() => {
            setId(props.locationName);
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default LocationComponent;
