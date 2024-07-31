import React, { useState, useEffect, useContext } from 'react';
import PartnersSingleCard from '../components/PartnersElements/PartnersSingleCard';
import supabase from '../tools/config/connect';
import { LanguageContext } from '../context/Language'
import Aos from 'aos';

const Partners = () => {
  const [partnersData, setPartnersData] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchPartnersData = async () => {
      try {
        const { data, error } = await supabase.from('PartnersPage').select();
        if (error) {
          throw new Error('Error fetching partners data:', error);
        }
        if (data) {
          setPartnersData(data);
        }
      } catch (error) {
        console.error('Error fetching partners data:', error);
      }
    };

    fetchPartnersData();

  }, []);

  const filterDataButtons = (cat) => {
    if (cat === 'All') {
      setFilter(null);
    } else {
      const result = partnersData.filter(item => item.category === cat);
      setFilter(result);
    }
  }

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  // ======================AOS======================================================================
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='partners container'>
      <div className='partners-text-part'>
        <div className="left-side" data-aos="fade-right" data-aos-duration="1000">
          <h1>{language === 'AZ' ? 'Tərəfdaşlar' : 'Partners'}</h1>
        </div>
        <div className="right-side" data-aos="fade-left" data-aos-duration="1000">
          <h6>{language === 'AZ' ?
            'Bu ilin mövzusu qonaqpərvərliyin gələcəyini formalaşdırmaqdır, buna görə də sənayemizin sərhədlərini genişləndirən həqiqi yenilikçilərlə əməkdaşlıq etdik.' :
            "This year's theme is shaping hospitality’s future, so we've partnered with some true innovators that are pushing the boundaries of our industry."}
          </h6>
        </div>
      </div>
      <div className='line-up'></div>

      <div className='filter-buttons'>
        <ul>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1000" onClick={() => filterDataButtons('All')}><button>{language === 'AZ' ? 'Hamısı' : 'All'}</button></li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1200" onClick={() => filterDataButtons('Headline Partner')}><button>{language === 'AZ' ? 'Baş Tərəfdaş' : 'Headline Partner'}</button></li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1300" onClick={() => filterDataButtons('Innovation')}><button>{language === 'AZ' ? 'Yenilik' : 'Innovation'}</button></li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1400" onClick={() => filterDataButtons('Exhibition')}><button>{language === 'AZ' ? 'Sərgi' : 'Exhibition'}</button></li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1500" onClick={() => filterDataButtons('Branding')}><button>{language === 'AZ' ? 'Markalaşma' : 'Branding'}</button></li>
          <li className='list-group-item' data-aos="fade-right" data-aos-duration="1600" onClick={() => filterDataButtons('Media')}><button>{language === 'AZ' ? 'Media' : 'Media'}</button></li>
        </ul>
      </div>

      <div className='filter-elements'>
        {(filter || partnersData).map(item => (
          <div key={item.id}>
            <PartnersSingleCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
