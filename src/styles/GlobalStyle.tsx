'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-align: center;
        vertical-align: middle;
    }
    body{
        max-width: 1200px;
       display: flex;
       flex-direction: column;
       margin: auto;
       &>*{
        width: 100%;
        }
    }
    a{
        color: inherit;
        
    }
`;

export default GlobalStyles;
