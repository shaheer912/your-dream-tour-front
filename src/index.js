import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'flowbite';
import store from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const devENV = process.env.NODE_ENV !== 'production';
const clientID = devENV
  ? '524596643585-390tgijnv3dm39ngas1oo8oceso6dkh4.apps.googleusercontent.com'
  : '524596643585-ftn35qoude531a6lih04fsv563e8ve33.apps.googleusercontent.com';
//524596643585-ftn35qoude531a6lih04fsv563e8ve33.apps.googleusercontent.com

root.render(
  <GoogleOAuthProvider clientId={clientID}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
document.documentElement.classList.add('dark');
document.body.classList.add(
  'p-5',
  'bg-white',
  'dark:bg-gray-900',
  'antialiased'
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
