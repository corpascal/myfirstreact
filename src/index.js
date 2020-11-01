import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Menu from './Menu';
import App from './App';
import App2 from './App2';
import FApp from './FApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>,
  document.getElementById('menu')
);

//const componentToDisplay = <App/>;
const componentToDisplay = <FApp/>;
//const componentToDisplay = <App2/>;
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)

ReactDOM.render(
  <React.StrictMode>
    {componentToDisplay}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
