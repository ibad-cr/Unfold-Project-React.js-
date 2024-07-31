import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('languageMode'));
    useEffect(() => {
        if (localStorage.getItem('changeLanguage') === null) {
            localStorage.setItem('languageMode', 'EN')
        }
    }, [])
    return (
        <LanguageContext.Provider value={[language, setLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}