import React from 'react';
import { createRoot } from "react-dom";
import './index.css';
// import App from './RealEstateApp';
import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.css';
import RealEstateApp from './RealEstateApp';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

createRoot.render(<RealEstateApp />, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
