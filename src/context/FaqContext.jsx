import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const FaqContext = createContext();

export const FaqProvider = ({ children }) => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5500/src/data/faq-data.json')
            .then(res => setFaqData(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, [])

    return (
        <FaqContext.Provider value={[faqData, setFaqData]}>
            {children}
        </FaqContext.Provider>
    );
};