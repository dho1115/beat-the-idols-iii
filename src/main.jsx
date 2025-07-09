import ErrorBoundary from './components/ErrorBoundary.jsx';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary fallback={<div style={{ height: '100vh', backgroundColor: 'lightgreen' }}><h1>Something went wrong inside main.jsx file.</h1></div>}>
      <App />
    </ErrorBoundary>
  </BrowserRouter>  
)
