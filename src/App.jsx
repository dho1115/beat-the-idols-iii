import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomePage from './pages/welcome/WelcomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
