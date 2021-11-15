import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { loginUser, setLoading, setLogin } from '../reducers/apiReducer';

function Login() {
  
  const history = useHistory();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoad] = useState(false);

  console.log(data,'Response')
  useEffect(() => {
    setLoad(data.loading)
  }, [data.loading])
  
  let input = { email, password };
  const loginFunc = async (e) => {
    e.preventDefault();

    await dispatch(setLoading());

    await dispatch(loginUser(input, history));
    
    await dispatch(setLogin());

  };
  
  return (
    <div>

        <>
          <h1 className="text-center">Login Now</h1>
          <form onSubmit={loginFunc}>
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
              loading?<button className="btn btn-primary disabled mt-4">Login...</button>:
              <button className="btn btn-primary mt-4">Login</button>
            } 
          </form>
        </>
    
    </div>
  );
}

export default Login;
