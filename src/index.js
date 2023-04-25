import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// PROVIDERS
import LogProvider from './providers/log-provider'
import StoreProvider from './providers/store-provider'

ReactDOM.render(
    <React.StrictMode>
        <LogProvider>
            <StoreProvider>
                <App />
            </StoreProvider>
        </LogProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
