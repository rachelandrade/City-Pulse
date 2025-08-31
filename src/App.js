import { Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // localization config
import { FavouritesProvider } from './context/FavouritesContext';
import { Splash, Home, EventDetails, Profile, Login, Logout } from './pages';
import { Header, Footer } from './components'
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  localStorage.setItem('userProfile', JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+971 501234567'
  }));

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <FavouritesProvider>
          <div className='app-container'>
            <Header />
            <main className='main-content'>
              <Routes>
                <Route path="/" element={<Splash />} />

                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/event/:id" element={<EventDetails />} />


                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavouritesProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;