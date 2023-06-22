import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// PROVIDERS
import LogProvider from './providers/log-provider'

ReactDOM.render(
    <React.StrictMode>
        <LogProvider>
            <App />
        </LogProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
