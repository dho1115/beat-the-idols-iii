import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//Components.
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Pages
// import AboutUsPage from './pages/about/AboutUsPage'; //lazy loaded.
// import ContactPage from './pages/contact/ContactPage'; //lazy loaded.
// import Homepage from './pages/home/Homepage'; //lazy loaded now.
import WelcomePage from './pages/welcome/WelcomePage';

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));

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
