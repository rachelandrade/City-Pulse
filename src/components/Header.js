import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import '../i18n';
import './Header.css';

export const Header = () => {
    const { t, i18n } = useTranslation();
    const { user } = useAuth();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <header className="header">
            <nav className="nav">
                
                <Link to="/" className="nav-link">{t('splash')}</Link>
                <Link to="/home" className="nav-link">{t('home')}</Link>
                {user && <Link to="/profile" className="nav-link">{t('profile')}</Link>}
                {user ? <Link to="/logout" className="nav-link">{t('logout')}</Link> :
                    <Link to="/login" className="nav-link">{t('login')}</Link>}
                <button onClick={toggleLanguage} className="lang-toggle">
                    {t('toggleLanguage')}
                </button>
            </nav>
        </header>
    );
}