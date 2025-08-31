import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    splash: 'Splash',
                    home: 'Home',
                    eventDetails: 'Event Details',
                    profile: 'Profile',
                    toggleLanguage: 'عربي',
                    login: 'Login',
                    logout: 'Logout'
                },
            },
            ar: {
                translation: {
                    splash: 'الصفحة الرئيسية',
                    home: 'الصفحة الرئيسية',
                    eventDetails: 'تفاصيل الحدث',
                    profile: 'الملف الشخصي',
                    toggleLanguage: 'English',
                    login: 'Login',
                    logout: 'Logout'
                },
            },
        },
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;