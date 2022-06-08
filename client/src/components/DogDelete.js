import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const DogDelete = ({ getDogs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const from = location.state?.from?.pathname || '/dogs';
  const dog = location.state?.dog;

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const handleYes = async () => {
    try {
      const response = await axiosPrivate.delete(`/dogs/${dog.id}`);
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 403) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Error');
      }
      errRef.current.focus();
    }
    navigate(from, { replace: true });
    getDogs('/dogs/?limit=3&offset=0');
  };

  const handleNo = () => {
    navigate(from, { replace: true });
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Delete {dog.name}?</h1>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </section>
  );
};

export default DogDelete;
