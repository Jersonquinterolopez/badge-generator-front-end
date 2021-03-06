import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import Axios from 'axios';
import config from '../../../config/index';

function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const signup = () => history.push('./sign-up');
  const login = () => history.push('./login');
  const logout = async () => {
    await Axios.post(`${config.apiUrl}/users/logout`, {
      withCredentials: true,
    });
    setUserData({
      user: undefined,
    });
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className="buttons">
      {userData.user ? (
        <button className="button is-light" onClick={logout}>
          Log out
        </button>
      ) : (
        <div>
          <button className="button is-primary" onClick={signup}>
            <strong>Sign-up</strong>
          </button>
          <button className="button is-light" onClick={login}>
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthOptions;
