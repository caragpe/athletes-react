//@flow 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Games from './components/Games/main';


ReactDOM.render(
  <React.StrictMode>
    <div>
      <Games />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
