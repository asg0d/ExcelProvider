import React, { useContext } from "react";
import { LangContext } from "../context/LanguageContext";

function Language() {
  const { language, setLanguage } = useContext(LangContext);

  const handleChange = (e) => {
    localStorage.setItem("lang", e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <div className="excel__langs">
      <select
        className="excel__header"
        value={language}
        onChange={handleChange}
      >
        <option value="eng">Eng</option>
        <option value="uzb">Uzb</option>
        <option value="rus">Рус</option>
      </select>
    </div>
  );
}

export default Language;
