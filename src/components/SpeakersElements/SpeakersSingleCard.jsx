import React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../../context/Language';
import Aos from 'aos';
import { useEffect } from 'react';

const SpeakersSingleCard = ({ alldata, id, commingId }) => {
  const marginTop = id % 2 === 0 ? '100px' : '130px';

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

    // ======================AOS======================================================================
    useEffect(() => {
      Aos.init();
    }, [])

  return (
    <div className='speakers-single-cards' style={{ marginTop }} data-aos="fade-down" data-aos-duration="1400">  
      <div className="col">
        <div className="card">
          <img src={alldata.image} className="card-img-top" alt={alldata.image} />
          <div className='speakers-logo-absolute'>
            <img src={alldata.logo} alt={alldata.logo} />
          </div>
          <div className='speakers-category'>
            <p>{language === 'AZ' ? alldata.languageCategory : alldata.category}</p>
          </div>
          <div className="card-body">
            <h5 className="card-title mt-4" style={{ color: 'white' }}>{alldata.name}</h5>
            <p className="card-text" style={{ color: 'white' }}>{alldata.role.slice(0, 30)}...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakersSingleCard;
