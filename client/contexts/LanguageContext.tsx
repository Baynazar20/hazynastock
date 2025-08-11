import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'tk' | 'kk' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.images': 'Images',
    'nav.videos': 'Videos',
    'nav.3d-models': '3D Models',
    'nav.icons': 'Icons',
    'nav.profile': 'Profile',
    'nav.contributor': 'Contributor',
    'nav.settings': 'Settings',
    'search.placeholder': 'Search stock media...',
    'hero.title': 'Discover Premium Stock Media',
    'hero.subtitle': 'Explore millions of high-quality images, videos, 3D models, and icons from talented creators across Central Asia',
    'hero.search.placeholder': 'Search for images, videos, 3D models...',
    'button.upload': 'Upload',
    'button.search': 'Search',
    'button.view-all': 'View All',
    'featured.title': 'Featured Content',
    'gallery.title': 'Browse Collection',
    'sort.latest': 'Latest',
    'sort.popular': 'Popular',
    'sort.downloads': 'Most Downloaded',
    'sort.rated': 'Highest Rated',
    'media.free': 'Free',
    'media.premium': 'Premium',
    'filter.all-types': 'All Types',
    'filter.more': 'More Filters',
    'results.showing': 'Showing {count} results'
  },
  ru: {
    'nav.home': 'Главная',
    'nav.images': 'Изображения',
    'nav.videos': 'Видео',
    'nav.3d-models': '3D Модели',
    'nav.icons': 'Иконки',
    'nav.profile': 'Профиль',
    'nav.contributor': 'Автор',
    'nav.settings': 'Настройки',
    'search.placeholder': 'Поиск медиа...',
    'hero.title': 'Откройте Премиум Стоковые Медиа',
    'hero.subtitle': 'Исследуйте миллионы высококачественных изображений, видео, 3D моделей и иконок от талантливых авторов Центральной Азии',
    'hero.search.placeholder': 'Поиск изображений, видео, 3D моделей...',
    'button.upload': 'Загрузить',
    'button.search': 'Поиск',
    'button.view-all': 'Смотреть все',
    'featured.title': 'Рекомендуемое',
    'gallery.title': 'Обзор коллекции',
    'sort.latest': 'Новые',
    'sort.popular': 'Популярные',
    'sort.downloads': 'Самые скачиваемые',
    'sort.rated': 'Высоко оцененные',
    'media.free': 'Бесплатно',
    'media.premium': 'Премиум',
    'filter.all-types': 'Все типы',
    'filter.more': 'Больше фильтров',
    'results.showing': 'Показано {count} результатов'
  },
  tk: {
    'nav.home': 'Baş sahypa',
    'nav.images': 'Suratlar',
    'nav.videos': 'Wideolar',
    'nav.3d-models': '3D Modellar',
    'nav.icons': 'Bellikler',
    'nav.profile': 'Profil',
    'nav.contributor': 'Awtor',
    'nav.settings': 'Sazlamalar',
    'search.placeholder': 'Media gözle...',
    'hero.title': 'Premium Stok Media Açyň',
    'hero.subtitle': 'Orta Aziýanyň zehinli döredijilerinden millionlarça ýokary hilli suratlar, wideolar, 3D modeller we bellikler barlaň',
    'hero.search.placeholder': 'Suratlar, wideolar, 3D modeller gözle...',
    'button.upload': 'Ýükle',
    'button.search': 'Gözle',
    'button.view-all': 'Hemmesini gör',
    'featured.title': 'Aýratyn mazmun',
    'gallery.title': 'Kolleksiýa serediň',
    'sort.latest': 'Iň täze',
    'sort.popular': 'Meşhur',
    'sort.downloads': 'Iň köp göçürilen',
    'sort.rated': 'Iň ýokary baha berilen',
    'media.free': 'Mugt',
    'media.premium': 'Premium',
    'filter.all-types': 'Ähli görnüşler',
    'filter.more': 'Has köp süzgüç',
    'results.showing': '{count} netije görkezilýär'
  },
  kk: {
    'nav.home': 'Басты бет',
    'nav.images': 'Суреттер',
    'nav.videos': 'Видеолар',
    'nav.3d-models': '3D Модельдер',
    'nav.icons': 'Белгішелер',
    'nav.profile': 'Профиль',
    'nav.contributor': 'Автор',
    'nav.settings': 'Баптаулар',
    'search.placeholder': 'Медиа іздеу...',
    'hero.title': 'Премиум Сток Медианы Ашыңыз',
    'hero.subtitle': 'Орталық Азияның талантты авторларынан миллиондаған жоғары сапалы суреттер, видеолар, 3D модельдер мен белгішелерді зерттеңіз',
    'hero.search.placeholder': 'Суреттер, видеолар, 3D модельдер іздеу...',
    'button.upload': 'Жүктеу',
    'button.search': 'Іздеу',
    'button.view-all': 'Барлығын көру',
    'featured.title': 'Ұсынылған мазмұн',
    'gallery.title': 'Жинақты шолу',
    'sort.latest': 'Ең жаңа',
    'sort.popular': 'Танымал',
    'sort.downloads': 'Ең көп жүктелген',
    'sort.rated': 'Ең жоғары бағаланған',
    'media.free': 'Тегін',
    'media.premium': 'Премиум',
    'filter.all-types': 'Барлық түрлер',
    'filter.more': 'Көбірек сүзгілер',
    'results.showing': '{count} нәтиже көрсетілуде'
  },
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.images': 'Rasmlar',
    'nav.videos': 'Videolar',
    'nav.3d-models': '3D Modellar',
    'nav.icons': 'Belgilar',
    'nav.profile': 'Profil',
    'nav.contributor': 'Muallif',
    'nav.settings': 'Sozlamalar',
    'search.placeholder': 'Media qidirish...',
    'hero.title': 'Premium Stok Mediani Kashf Eting',
    'hero.subtitle': 'Markaziy Osiyoning iqtidorli ijodkorlaridan millionlab yuqori sifatli rasmlar, videolar, 3D modellar va belgilarni o\'rganing',
    'hero.search.placeholder': 'Rasmlar, videolar, 3D modellar qidirish...',
    'button.upload': 'Yuklash',
    'button.search': 'Qidirish',
    'button.view-all': 'Barchasini ko\'rish',
    'featured.title': 'Tavsiya etilgan kontent',
    'gallery.title': 'Kolleksiyani ko\'rish',
    'sort.latest': 'Eng yangi',
    'sort.popular': 'Mashhur',
    'sort.downloads': 'Eng ko\'p yuklab olingan',
    'sort.rated': 'Eng yuqori baholangan',
    'media.free': 'Bepul',
    'media.premium': 'Premium',
    'filter.all-types': 'Barcha turlar',
    'filter.more': 'Ko\'proq filtrlar',
    'results.showing': '{count} natija ko\'rsatilmoqda'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || translations.en[key] || key;
    
    // Simple parameter replacement
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
