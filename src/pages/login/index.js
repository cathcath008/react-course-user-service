import React, { useState } from 'react';
import { setCookie } from '../../utils/cookie';
import { authService } from '../../services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginLoading, setLoginLoading] = useState(false);

  const onSubmitLogin = () => {
    setLoginLoading(true);
    authService
      .login(username, password)
      .then((res) => {
        console.log(res, 'line 16');
        const cookieToken = res.token;
        const cookieUser = res.username;
        setCookie('userData', JSON.stringify(cookieUser), 10000);
        setCookie('token', JSON.stringify(cookieToken), 10000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  return (
    <div className="container">
      <h2> Login Page</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitLogin();
        }}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="form-control"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="password"
          />
        </div>
        <button
          type="submit"
          value="submit"
          disabled={isLoginLoading}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

{
  /* <form
        className="login_form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitLogin();
        }}
      >
        <label htmlFor="username">
          Username :
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" disabled={isLoginLoading} />
      </form> */
}

export default Login;

// Login

// form => post ke server => waiting for response (loading state) =>
// receive response from server => success -> success statement to user
//                              => error -> error statement to user  -> next ngapain user?

// if success - get token from be - save Token to cookie -> redirect ??

// Loading state treatment
// race condition -> unstable connection

// Action A -> Response A  ->  Action B ->  Response B -> success
