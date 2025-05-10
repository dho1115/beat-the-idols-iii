import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Pages
import WelcomePage from './pages/welcome/WelcomePage';
import AboutUsPage from './pages/about/AboutUsPage';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
