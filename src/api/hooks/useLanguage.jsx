import React, { useContext } from 'react'
import { LangContext } from '../../context/LanguageContext'
import { TranslateData } from '../../utils/TranslateDat';

function useLanguage() {
  const {language} = useContext(LangContext);

  const res = (key) => {
    const Translations = {...TranslateData};
    return Translations[key]?.[language] || key;
};

  
  return  {t: res};
}

export default useLanguage;
