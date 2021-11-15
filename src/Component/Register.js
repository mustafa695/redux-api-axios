import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchDataAsync, setLoading } from '../reducers/apiReducer';

function Register() {
  
  const history = useHistory();

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [loading, setLoad] = useState(false);

  console.log(data,'Response')
  useEffect(() => {
    setLoad(data.loading)
  }, [data.loading])

  console.log(data.loading, 'Loading status')
  
  let input = { email, password };
  const regiserFunc = async (e) => {
    e.preventDefault();

    await dispatch(setLoading());

    await dispatch(fetchDataAsync(input));  

  };
  
  return (
    <div>

        <>
          <h1 className="text-center">Register Now</h1>
          <form onSubmit={regiserFunc}>
            <label>Email</label>
            <input
              type="email"
              className="form-control mb-4"
              placeholder="Enter Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {
              loading?<button className="btn btn-primary disabled mt-4">Register...</button>:
              <button className="btn btn-primary mt-4">Register</button>
            } 
          </form>
        </>
    
    </div>
  );
}

export default Register;
