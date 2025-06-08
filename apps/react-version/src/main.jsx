import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';             // 确保这行存在！
import './index.css';                // 确保 Tailwind 样式导入了

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
