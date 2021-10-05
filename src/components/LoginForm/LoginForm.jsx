import { FormControl, TextField, Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (    
      <div id="login-form-div">
        <Box 
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl onSubmit={login} className="formPanel">
            <Typography variant="h2">Login</Typography>
            {errors.loginMessage && (
              <Typography variant="h3" className="alert" role="alert">
                {errors.loginMessage}
              </Typography>
            )}
            <div className="input-fields">
              <TextField 
                id="username-input"
                label="Username" 
                variant="outlined" 
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="input-fields">
              <TextField 
                id="password-input"
                label="Password" 
                variant="outlined" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              /> 
            </div>
            <div id="login-button-div">
              <Button 
                id="login-button"
                variant="contained" 
                color="primary"
              >
                Log In
              </Button>
            </div>
          </FormControl>
        </Box>
      </div>
  );
}

export default LoginForm;
