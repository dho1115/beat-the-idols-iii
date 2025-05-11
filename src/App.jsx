import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//Components.
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Pages
import AboutUsPage from './pages/about/AboutUsPage';
import ContactPage from './pages/contact/ContactPage';
import Homepage from './pages/home/Homepage';
import WelcomePage from './pages/welcome/WelcomePage';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <WelcomeNavbar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
