import React, { useState, useEffect} from "react";
import apiClient from "./api";
import {NavLink} from "react-router-dom";

const SessionFn = () => {

  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );

  const [user, setUser] = useState({});

  useEffect(() => {
    apiClient.get('shapi/v1/user').then(resp => {
      let user = resp.data.result;
      setUser(user);
    })
  }, {})

  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };


  const logout = () => {
    apiClient.post('/logout').then(response => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })
  };
  const authLink = loggedIn
    ? <button onClick={logout} className="nav-link btn btn-link">Logout</button>
    : <NavLink to='/login' className="nav-link">Login</NavLink>;

  const userInfo = !loggedIn ? null : <span>{user.name}</span>;

  return(
    <>
      <div>{authLink}</div>
      <div>{userInfo}</div>
    </>
  )


}

export function getSession() {
  return SessionFn;
}