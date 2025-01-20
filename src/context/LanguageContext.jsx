import { createContext, useState } from "react";


export const LangContext = createContext(null);

export function LangProvider({children}) {
    let localeLanguage = localStorage.getItem("lang") || "eng";


    const [language, setLanguage] = useState(localeLanguage);

    return (
        <LangContext.Provider value={{language, setLanguage}}>
            {children}
        </LangContext.Provider>
    )
}