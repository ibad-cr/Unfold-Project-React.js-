import React, { useContext, useState, useEffect } from 'react';
import SpeakersSingleCard from '../components/SpeakersElements/SpeakersSingleCard';
import { SpeakersContext } from '../context/SpeakersContext';
import { LanguageContext } from '../context/Language';
import Aos from 'aos';

const Speakers = () => {
  const [product] = useContext(SpeakersContext);
  const [filter, setFilter] = useState(product);

  const filterProduct = (cat) => {
    if (cat === 'All') {
      setFilter(product);
    } else {
      const result = product.filter(item => item.category === cat);
      console.log('Filtered Result:', result);
      setFilter(result);
    }
  };

  useEffect(() => {
    setFilter(product);
    console.log('Product List:', product);
  }, [product]);

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  // ======================AOS======================================================================
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <>
      <div style={{ backgroundColor: '#1e1e25' }}>
        <section className='all-speakers'>
          <div className="all-speakers-wrapper">
            <div className="all-speakers-container">
              <div className='texts-part'>
                <div className='title-text' data-aos="fade-right" data-aos-duration="1000">
                  <h1>{language === 'AZ' ? 'Bu ilin spikerləri' : 'This Year\'s Speakers'}</h1>
                </div>

                <div className='paragraph mt-4' data-aos="fade-left" data-aos-duration="1000">
                  <div style={{ color: 'white', lineHeight: '20px' }}>
                    {language === 'AZ' ? 'Qonaqpərvərliyin ən yaxşıları və ən parlaqları Unfold-da danışmağa dəvət olunur. Bu il iştirakçılara ilham verəcək insanlardan bəziləri.' : 'Hospitality\'s best and brightest are invited to speak at Unfold. Here are some of the people who\'ll inspire attendees this year.'}
                  </div>
                </div>
              </div>

              <div className='line'></div>

              <div className='filter-button mt-4'>
                <ul>
                  <li className="list-group-item" data-aos="zoom-in-down" data-aos-duration="1000"><button onClick={() => filterProduct('All')}>{language === 'AZ' ? 'Hamısı' : 'All'}</button></li>
                  <li className="list-group-item" data-aos="zoom-in-down" data-aos-duration="1200"><button onClick={() => filterProduct('Hotelier')}>{language === 'AZ' ? 'Otelçi' : 'Hotelier'}</button></li>
                  <li className="list-group-item" data-aos="zoom-in-down" data-aos-duration="1400"><button onClick={() => filterProduct('Keynote')}>{language === 'AZ' ? 'Əsas söz' : 'Keynote'}</button></li>
                  <li className="list-group-item" data-aos="zoom-in-down" data-aos-duration="1600"><button onClick={() => filterProduct('Technology')}>{language === 'AZ' ? 'Texnologiya' : 'Technology'}</button></li>
                  <li className="list-group-item" data-aos="zoom-in-down" data-aos-duration="1800"><button onClick={() => filterProduct('Consultant')}>{language === 'AZ' ? 'Məsləhətçi' : 'Consultant'}</button></li>
                </ul>
                <div>
                  <div className="row row-cols-2 row-cols-md-4 g-4">
                    {filter.map((item, index) => (
                      <SpeakersSingleCard
                        key={item.id}
                        commingId={item.id}
                        alldata={item}
                        id={index % 2 === 0 ? 1 : 2} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Speakers;
