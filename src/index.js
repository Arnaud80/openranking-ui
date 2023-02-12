import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@vtmn/icons/dist/vitamix/font/vitamix.css';
import App from './App.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="952251694198-0bimgqri5267a9gm14a1e5pmmnuvr634.apps.googleusercontent.com">
        <App className="block"/>
    </GoogleOAuthProvider>
);
