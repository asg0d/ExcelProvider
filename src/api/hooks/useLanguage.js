import { useContext } from 'react';
import { LangContext } from '../../context/LanguageContext';

const translations = {
  eng: {
    import: "Import",
  },
  uzb: {
    import: "Import qilish",
  },
  rus: {
    import: "Импорт",
  }
};

const useLanguage = () => {
  const { language } = useContext(LangContext);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { t };
};

export default useLanguage;
