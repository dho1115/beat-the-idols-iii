import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Pages
import AboutUsPage from './pages/about/AboutUsPage';
import Homepage from './pages/home/Homepage';
import WelcomePage from './pages/welcome/WelcomePage';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
