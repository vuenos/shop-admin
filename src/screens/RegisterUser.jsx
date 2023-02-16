import React from 'react';
import {useAuthState} from "../atoms/auth";

const RegisterUser = () => {
  const [authState, setAuthState] = useAuthState();

  return (
    <div>
      <h1>RegisterUser</h1>
    </div>
  );
};

export default RegisterUser;
