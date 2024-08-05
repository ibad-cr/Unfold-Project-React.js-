import React from 'react'
import FaqSingleCard from '../components/FaqElemenets/FaqSingleCard'
import { useContext } from 'react'
import { FaqContext } from '../context/FaqContext';
import { useState } from 'react';
import { useEffect } from 'react';
import Aos from 'aos';
import { LanguageContext } from '../context/Language';

const Faq = () => {
  const [faqData] = useContext(FaqContext);
  const [filter, setFilter] = useState(faqData);

  useEffect(() => {
    setFilter(faqData)
  }, [faqData]);


  const filterData = (cat) => {
    if (cat === 'All') {
      setFilter(faqData);
    } else {
      const result = faqData.filter(item => item.category === cat);
      console.log('Filtered Result:', result);
      setFilter(result);
    }
  };

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  // ======================AOS======================================================================
  useEffect(() => {
    Aos.init();
  }, [])


  return (
    <div className='faq container'>
      <div className='faq-text-part'>
        <div className="left-side" data-aos="fade-right" data-aos-duration="1000">
          <h1>FAQs</h1>
        </div>
      </div>
      <div className='line-up'></div>

      <div className='filter-buttons'>
        <ul>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1000">
            <button onClick={() => filterData('All')}>{language === 'AZ' ? 'Hamısı' : 'All'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1200">
            <button onClick={() => filterData('Where can I stay?')}>{language === 'AZ' ? 'Harada qala bilərəm?' : 'Where can I stay?'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1300">
            <button onClick={() => filterData('In-person experience')}>{language === 'AZ' ? 'Yerində təcrübə' : 'In-person experience'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1400">
            <button onClick={() => filterData('Tickets')}>{language === 'AZ' ? 'Biletlər' : 'Tickets'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1500">
            <button onClick={() => filterData('Venue')}>{language === 'AZ' ? 'Mekan' : 'Venue'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1600">
            <button onClick={() => filterData('Workshop sessions')}>{language === 'AZ' ? 'Workshop sessiyaları' : 'Workshop sessions'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1700">
            <button onClick={() => filterData('Networking & afterparty')}>{language === 'AZ' ? 'Şəbəkələşmə və afterparty' : 'Networking & afterparty'}</button>
          </li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1800">
            <button onClick={() => filterData('Other')}>{language === 'AZ' ? 'Digər' : 'Other'}</button>
          </li>
        </ul>

      </div>

      <div className='filter-elements border-bottom'>
        {filter.map(items => (
          <div data-aos="fade-up" data-aos-duration="1000"><FaqSingleCard key={items.id} alldata={items} /></div>
        ))}
      </div>
    </div>
  )
}

export default Faq;