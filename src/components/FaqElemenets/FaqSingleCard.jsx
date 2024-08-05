import React, { useState } from 'react';
import { IoRemoveOutline } from 'react-icons/io5';
import { TfiPlus } from 'react-icons/tfi';
import { LanguageContext } from '../../context/Language';
import { useContext } from 'react';

const FaqSingleCard = ({ alldata, index }) => {
    const [accordion, setAccordion] = useState(null);

    const toggle = (i) => {
        if (accordion === i) {
            return setAccordion(null);
        }
        setAccordion(i);
    };

    // ====================================Language========================================
    const [language, setLanguage] = useContext(LanguageContext);

    return (
        <div className='mt-5 border-bottom'>
            <div className='accordion mt-5'>
                <div className='category mb-4'>
                    <h6>{language === 'AZ' ? alldata.categoryLanguage : alldata.category}</h6>
                </div>

                <div className='toggle-div' onClick={() => toggle(index)} style={{ cursor: 'pointer', padding: '10px' }}>
                    <div className='d-flex justify-content-between'>
                        <h4 className='title'>{language === 'AZ' ? alldata.titleLanguage : alldata.title}</h4>
                        <button className={`open-button ${accordion === index ? 'clicked' : ''}`}>
                            {accordion === index ? <IoRemoveOutline /> : <TfiPlus />}
                        </button>
                    </div>
                    <div className='mt-4'>
                        <p className={accordion === index ? 'text active' : 'text'}>
                            {language === 'AZ' ? alldata.textLanguage : alldata.text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSingleCard;
