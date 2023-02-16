import React, { useEffect } from 'react';
import AppRoutes from "./routes";
import { useAuthState } from "./atoms/auth";
import { useNavigate } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { Cookies } from "react-cookie";

const App = () => {
  const [authState, setAuthState] = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"))
    if (token){
      console.log("TOKEN", token)
      setAuthState({loggedIn: true, ...token})
      console.log('AUTH_STATE', authState)
    }
  }, []);

  useEffect(() => {

    console.log('APP_LOGGEDIN', authState.loggedIn)
    // if(!authState.loggedIn) {
    //   setAuthState({loggedIn: false})
    //   navigate('/login');
    // } else {
    //   setAuthState({loggedIn: true})
    //   alert(`LoggedIn : ${authState.loggedIn}`)
    //   console.log('AUTH_STATE', authState.loggedIn)
    // }
  }, [authState.loggedIn]);

  if (authState.loggedIn) {
    return (
      <AppRoutes />
    );
  } else {
    return (
      <Login />
    );
  }
};

export default App;
