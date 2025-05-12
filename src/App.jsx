import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//Components.
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const RegistrationPage = lazy(() => import('./pages/registration/RegistrationPage'));
const WelcomePage = lazy(() => import('./pages/welcome/WelcomePage'));

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
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
