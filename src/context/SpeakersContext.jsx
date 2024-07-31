import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const SpeakersContext = createContext();

export const SpeakersProvider = ({ children }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5500/src/data/speaker-data.json')
            .then(res => setProduct(res.data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    return (
        <SpeakersContext.Provider value={[product, setProduct]}>
            {children}
        </SpeakersContext.Provider>
    );
};
