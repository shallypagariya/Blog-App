
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js'; 

dotenv.config();

export const signupUser = async (request, response) => {
  console.log('Signup request received');
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = { username: request.body.username, name: request.body.name, password: hashedPassword };
    const newUser = new User(user);
    await newUser.save();
    console.log('User signed up successfully');
    return response.status(200).json({ msg: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    return response.status(500).json({ msg: 'Error while Signup' });
  }
};

export const loginUser = async (request, response) => {
  console.log('Login request received');
  try {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
      console.log('Username does not match');
      return response.status(400).json({ msg: 'Username does not match' });
    }

    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      console.log('User logged in successfully');
      return response.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });
    } else {
      console.log('Password does not match');
      return response.status(400).json({ msg: 'Password does not match' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return response.status(500).json({ msg: 'Error while logging in user' });
  }
};






















