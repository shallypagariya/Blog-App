

import { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 500px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  position: relative;
  overflow: hidden;
`;

const BackgroundImage = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('BackGround.jpg') no-repeat center center;
  background-size: cover;
  z-index: -1;
`;

const Image = styled('img')({
  width: 200,
  margin: 'auto',
  display: 'flex',
  padding: '50px 0 0',
});

const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  margin-top: 15px;
  width: 80%;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 40%);
  height: 48px;
  margin-top: 15px;
  width: 80%;
  margin-left: 15px;
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const signUpInitial = {
  name: '',
  username: '',
  password: '',
};

const loginInitial = {
  name: '',
  password: '',
};

export default function Login({ isUserAuthenticated }) {
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJmGQU-YJkAWvjqyS0zA6Ul5zqRPNBK_8YA&s";

  const [account, setAccount] = useState('login');
  const [signup, setSignup] = useState(signUpInitial);
  const [error, setError] = useState('');
  const [login, setLogin] = useState(loginInitial);

  const { setAcc } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    setAccount(account === 'login' ? 'signup' : 'login');
  };

  const onInputChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignup(signUpInitial);
      setAccount('login');
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  const onValueChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError('');
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
      setAcc({ username: response.data.username, name: response.data.name });
      isUserAuthenticated(true);
      navigate('/');
    } else {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Component>
      <BackgroundImage />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Image src={imageUrl} />
        {account === 'login' ? (
          <div>
            <TextField
              style={{ marginLeft: '15px' }}
              variant='standard'
              label="Enter UserName"
              name='username'
              value={login.username}
              onChange={onValueChange}
            />
            <br />
            <TextField
              style={{ marginLeft: '15px' }}
              variant='standard'
              label="Enter Password"
              type="password"
              name='password'
              value={login.password}
              onChange={onValueChange}
            />
            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
            <Typography style={{ textAlign: 'center', color: '#878787', marginTop: '15px' }}>OR</Typography>
            <SignUpButton style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '15px' }} onClick={toggleSignup}>Create an account</SignUpButton>
          </div>
        ) : (
          <div>
            <TextField
              style={{ marginLeft: '15px' }}
              variant='standard'
              label="Enter Name"
              name='name'
              onChange={onInputChange}
            />
            <br />
            <TextField
              style={{ marginLeft: '15px' }}
              variant='standard'
              label="Enter UserName"
              name='username'
              onChange={onInputChange}
            />
            <br />
            <TextField
              style={{ marginLeft: '15px' }}
              variant='standard'
              label="Enter Password"
              name='password'
              onChange={onInputChange}
            />
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={signupUser}>Sign Up</SignUpButton>
            <Typography style={{ textAlign: 'center', color: '#878787', marginTop: '15px' }}>OR</Typography>
            <LoginButton
              variant="contained"
              style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '15px' }}
              onClick={toggleSignup}
            >
              Already Have an Account
            </LoginButton>
          </div>
        )}
      </Box>
    </Component>
  );
}
