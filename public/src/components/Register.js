import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { register } from '../services/apiService';

function Register() {
  const [state, setState] = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const user = await register({ username, password });
    setState({ ...state, user });
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
