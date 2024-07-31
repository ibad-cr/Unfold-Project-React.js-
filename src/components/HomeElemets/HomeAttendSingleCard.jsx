import React from 'react'
import { useContext } from 'react';
import { LanguageContext } from '../../context/Language';

const HomeAttendSingleCard = ({ alldata }) => {
  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);
  
  return (
    <div className='mb-5'>
      <div className='single-card'>
        <div>
          <span className='data-number'>{alldata.number}</span>
        </div>
        <div style={{ width: '70%' }}>
          <span className='data-text'>{language === 'AZ' ? alldata.languageChange : alldata.text}</span>
        </div>
      </div>
    </div>
  )
}

export default HomeAttendSingleCard