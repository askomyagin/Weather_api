import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';

import { Global, css } from '@emotion/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Global
                styles={css`
                    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap');
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                `}
            />
        </BrowserRouter>
    </React.StrictMode>
);
