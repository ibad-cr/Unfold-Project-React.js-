import React from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/Language';
import { useContext } from 'react';

const Footer = () => {
  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  // Translations
  const translations = {
    speakers: language === 'AZ' ? 'Spikerlər' : 'Speakers',
    shop: language === 'AZ' ? 'Biletlər' : 'Tickets',
    blog: language === 'AZ' ? 'Bloq' : 'Blog',
    contact: language === 'AZ' ? 'Əlaqə' : 'Contact',
    partners: language === 'AZ' ? 'Tərəfdaşlar' : 'Partners',
    faq: language === 'AZ' ? 'FAQ' : 'FAQ',
    linkedin: language === 'AZ' ? 'Mews LinkedIn' : 'Mews LinkedIn',
    instagram: language === 'AZ' ? 'Mews Instagram' : 'Mews Instagram',
    facebook: language === 'AZ' ? 'Mews Facebook' : 'Mews Facebook',
    twitter: language === 'AZ' ? 'Mews X' : 'Mews X',
    stayUpdated: language === 'AZ' ? 'Unfold 2024 haqqında bütün yeniliklərdən xəbərdar olun' : 'Stay up to date on all things Unfold 2024',
    joinNewsletter: language === 'AZ' ? 'Bizim xəbər bülletenimizə qoşulun' : 'Join our newsletter',
    subscribeText: language === 'AZ' ? 'Tədbirlə bağlı bütün yeniliklər üçün Unfold poçt siyahısına abunə olun.' : 'Subscribe to our Unfold mailing list for all updates surrounding the event.',
    unsubscribeText: language === 'AZ' ? 'Bu əlaqələrdən istənilən vaxt çıxa bilərsiniz. Daha çox məlumat üçün Mews Məxfilik Siyasətinə baxın.' : 'You can unsubscribe from these communications at any time. Please review the Mews Privacy Policy for more information.'
  };

  return (
    <div className='footer'>
      <div className='container'>
        <div className='unfold-footer'>
          <div className="footer-left-and-right-side">
            <div className='left-side-footer'>
              <div className='footer-title-unfold mt-5'><h1>Unfold</h1></div>

              <div className='all-column mt-5'>
                <div className='first-column'>
                  <ul>
                    <li className='list-group-item mb-3'><Link to='/speakers' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.speakers}
                    </Link></li>
                    <li className='list-group-item mb-3'><Link to='/tickets' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.shop}
                    </Link></li>
                    <li className='list-group-item mb-3'><Link to='/blog' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.blog}
                    </Link></li>
                  </ul>
                  
                  <ul>
                    <li className='list-group-item mb-3'><Link to='/partners' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.partners}
                    </Link></li>
                    <li className='list-group-item mb-3'><Link to='/contact' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.contact}
                    </Link></li>
                    <li className='list-group-item'><Link to='/faq' className='column-element' onClick={() => window.location.replace('#top')}>
                      {translations.faq}
                    </Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='right-side-footer mt-5'>
              <h1 className='mb-4'>{translations.stayUpdated}</h1>
              <Link to='/login' className='join-newsletter-button'>{translations.joinNewsletter}</Link>
              <h6 className='mt-4'>{translations.subscribeText}</h6>
              <h6 className='mt-4'>{translations.unsubscribeText}
                <Link href="" style={{ color: 'white' }}> Mews Privacy Policy</Link>.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright'>
        <div className='container'>
          <div className='copyright-elements'>
            <img src="../src/assets/img/Mews.png" alt="" />
            <div><h3>Mews Systems Copyright © 2024</h3></div>
            <div className='responsive-none'><h3>Code by @ibadismayil635@gmail.com</h3></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
