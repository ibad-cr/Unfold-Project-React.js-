import React from 'react';
import { useSelector } from 'react-redux';
import ShopSingleCard from '../components/ShopElements/ShopSingleCard';
import { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/Language';
import Aos from 'aos';
import { CgSortAz } from 'react-icons/cg';

const Shop = () => {
  const shop = useSelector(state => state.shop);

  const [filteredShop, setFilteredShop] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setFilteredShop(shop);
  }, [shop]);

  const filterData = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setFilteredShop(shop);
    } else {
      const result = shop.filter(item => item.category === cat);
      setFilteredShop(result);
    }
  };

  const [cookie,] = useCookies();

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

  // =================================Sort Method========================================
  const lowButton = () => {
    const sortedShop = [...filteredShop].sort((a, b) => a.price - b.price);
    setFilteredShop(sortedShop);
  };

  const highButton = () => {
    const sortedShop = [...filteredShop].sort((a, b) => b.price - a.price);
    setFilteredShop(sortedShop);
  };

  // ======================AOS======================================================================
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='shop-wrapper'>
      <div className='shop-container'>
        <div className='matt-and-richard mb-5 container'>
          <div className='first-cart' data-aos="fade-left" data-aos-duration="1000">
            <div className='left-side'>
              <h3 className='mb-4'>
                {language === 'AZ' ? 'Matt və Richard bir neçə söz' : 'A few words from Matt and Richard'}
              </h3>
              <p>{language === 'AZ' ?
                'Şayiələr doğrudur – Unfold 2024 bütün gözləntiləri üstələdi. Baş direktor və təsisçinin şirkətlərinin tədbiri haqqında deyəcəyi bir şey kimi səslənsə də, iştirak edənlər Amsterdamın heyrətamiz Muziekgebouw-da həqiqətən sehrli bir şeyin baş verdiyini təsdiqləyəcəklər.'
                :
                'The rumors are true – Unfold 2024 exceeded all expectations. While it might sound like something a CEO and Founder would say about their company’s event, those who attended will confirm that something magical indeed took place in Amsterdam’s stunning Muziekgebouw.'}
              </p>
              <p>{language === 'AZ' ?
                'Şayiələr doğrudur – Unfold 2024 bütün gözləntiləri üstələdi. Baş direktor və təsisçinin şirkətlərinin tədbiri haqqında deyəcəyi bir şey kimi səslənsə də, iştirak edənlər Amsterdamın heyrətamiz Muziekgebouw-da həqiqətən sehrli bir şeyin baş verdiyini təsdiqləyəcəklər.'
                :
                'The rumors are true – Unfold 2024 exceeded all expectations. While it might sound like something a CEO and Founder would say about their company’s event, those who attended will confirm that something magical indeed took place in Amsterdam’s stunning Muziekgebouw.'}
              </p>
            </div>
            <div className='right-side'>
              <img src="../src/assets/img/MR 1.png" alt="" />
            </div>
          </div>

          <div className='second-cart' data-aos="fade-right" data-aos-duration="1000">
            <d iv className='first-cart-2'>
              <div className='right-side-2'>
                <img src="../src/assets/img/Block2.png" alt="" />
              </div>
              <div className='left-side-2'>
                <p>{language === 'AZ' ?
                  'Maarifləndirici əsas səhnə sessiyalarından tutmuş paylama və gəlirin idarə olunması ilə bağlı dinamik seminarlaradək, Unfold 2024 məlumat və ideyalar xəzinəsi idi. Mews adından şəxsən və ya virtual olaraq bizə qoşulan hər kəsə təşəkkür edirik. Siz onu sənayemizin dayanıqlığı və yeniliyi üzrə qaçırılmayacaq bir bayrama çevirdiniz.'
                  :
                  'From the enlightening main stage sessions to the dynamic workshops delving into distribution and revenue management, Unfold 2024 was a treasure trove of insights and ideas. On behalf of Mews, we want to say thank you to everyone who joined us in person or virtually. You made it an unmissable celebration of our industry\'s resilience and innovation.'}
                </p>
                <p>{language === 'AZ' ?
                  'Hesab edirik ki, Unfold 2024-də qığılcım yandıran yenilik və əməkdaşlıq ruhu növbəti nəşrdə bizə qoşulmaq üçün sizi ilhamlandıracaq. Gələcək tədbirlərimiz haqqında məlumatlı qalmaq üçün aşağıda qeydiyyatdan keçin.'
                  :
                  'As you explore the highlights, we’re certain that the spirit of innovation and collaboration ignited at Unfold 2024 will inspire you to join us at the next edition. Sign up below to stay informed about our future events.'}
                </p>
              </div>
            </d>
          </div>
        </div>

        <div className='shop-carts'>
          <div className='mb-5'><h1>{language === 'AZ' ? 'Görüşlər' : 'Meetings'}</h1></div>
          <div className='d-flex justify-content-between'>
            <ul className='d-flex mb-5 shop-button-list' style={{ gap: '10px', margin: '0', padding: '0', width: '100%', flexWrap: 'wrap' }}>
              <li className='list-group-item' data-aos="fade-left" data-aos-duration="1200">
                <button style={{ cursor: 'pointer' }} className={`${activeCategory === 'All' ? 'active' : ''}`} onClick={() => filterData('All')}>{language === 'AZ' ? 'Hamısı' : 'All'}</button>
              </li>
              <li className='list-group-item' data-aos="fade-left" data-aos-duration="1400">
                <button style={{ cursor: 'pointer' }} className={`${activeCategory === 'Industry vision' ? 'active' : ''}`} onClick={() => filterData('Industry vision')}>{language === 'AZ' ? 'Sənaye baxışı' : 'Industry vision'}</button>
              </li>
              <li className='list-group-item' data-aos="fade-left" data-aos-duration="1600">
                <button style={{ cursor: 'pointer' }} className={`${activeCategory === 'Revenue and data' ? 'active' : ''}`} onClick={() => filterData('Revenue and data')}>{language === 'AZ' ? 'Gəlir və məlumat' : 'Revenue and data'}</button>
              </li>
              <li className='list-group-item' data-aos="fade-left" data-aos-duration="2000">
                <button style={{ cursor: 'pointer' }} className={`${activeCategory === 'Operational sessions' ? 'active' : ''}`} onClick={() => filterData('Operational sessions')}>{language === 'AZ' ? 'Əməliyyat sessiyaları' : 'Operational sessions'}</button>
              </li>

              <li className='list-group-item' data-aos="fade-left" data-aos-duration="1800">
                {cookie['adminToken'] === '000000000000' ?
                  <div className='admin-add-by-ticket'>
                    <Link
                      to='/tickets/addTicketByAdmin'
                      className='btn btn-warning'
                      onClick={() => window.location.replace('#top')}>
                      {language === 'AZ' ? 'Biletləri əlavə edin' : 'Add Tickets'}
                    </Link>
                  </div> : ''}
              </li>
            </ul>

            <div className='sort-dropdown-div'>
              <div className="sort-dropdown">
                <button className="sort-dropbtn">
                  <CgSortAz style={{ fontSize: '25px', color: 'white' }} />
                </button>
                <div className="sort-dropdown-content">
                  <button className='low' onClick={lowButton}>{language === 'AZ' ? 'Qiymət: aşağıdan yüksək' : 'Price: low to high'}</button>
                  <button className='high' onClick={highButton}>{language === 'AZ' ? 'Qiymət: yüksəkdən aşağı' : 'Price: high to low'}</button>
                </div>
              </div>
            </div>
          </div>

          <div className='row row-cols-1 row-cols-md-3 g-5'>
            {filteredShop.map((item, index) => (
              <div data-aos="fade-right" data-aos-duration="1000">
                <ShopSingleCard
                  key={index}
                  id={item.id}
                  image={item.image}
                  text={item.text}
                  languageText={item.languageText}
                  title={item.title}
                  information={item.information}
                  languageInformation={item.languageInformation}
                  price={item.price}
                  quantity={item.quantity}
                  alldata={item}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='horizontal-animation'>
          <div className="images">
            <div className="images-slide">
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%205-1.png?width=900&height=900&name=Frame%205-1.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%206.png?width=900&height=900&name=Frame%206.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%208.png?width=900&height=900&name=Frame%208.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%209.png?width=900&height=900&name=Frame%209.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery1.jpg?width=900&height=900&name=Gallery1.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery2.jpg?width=900&height=900&name=Gallery2.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery3.jpg?width=900&height=900&name=Gallery3.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery4.jpg?width=900&height=900&name=Gallery4.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery7.png?width=900&height=900&name=Gallery7.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Unfold%20Unpacked_Blog%202%20%CE%93%C3%87%C3%B4%20revenue%20insights%20-%20Thumbnail.webp?width=1230&height=678&name=Unfold%20Unpacked_Blog%202%20%CE%93%C3%87%C3%B4%20revenue%20insights%20-%20Thumbnail.webp" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Unfold%20Unpacked_Blog%203%20%CE%93%C3%87%C3%B4%20operational%20insights.webp?width=1230&height=678&name=Unfold%20Unpacked_Blog%203%20%CE%93%C3%87%C3%B4%20operational%20insights.webp" alt />
            </div>
            <div className="images-slide">
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%205-1.png?width=900&height=900&name=Frame%205-1.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%206.png?width=900&height=900&name=Frame%206.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%208.png?width=900&height=900&name=Frame%208.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Frame%209.png?width=900&height=900&name=Frame%209.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery1.jpg?width=900&height=900&name=Gallery1.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery2.jpg?width=900&height=900&name=Gallery2.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery3.jpg?width=900&height=900&name=Gallery3.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery4.jpg?width=900&height=900&name=Gallery4.jpg" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Gallery7.png?width=900&height=900&name=Gallery7.png" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Unfold%20Unpacked_Blog%202%20%CE%93%C3%87%C3%B4%20revenue%20insights%20-%20Thumbnail.webp?width=1230&height=678&name=Unfold%20Unpacked_Blog%202%20%CE%93%C3%87%C3%B4%20revenue%20insights%20-%20Thumbnail.webp" alt />
              <img src="https://www.mews.com/hs-fs/hubfs/Unfold%20Unpacked_Blog%203%20%CE%93%C3%87%C3%B4%20operational%20insights.webp?width=1230&height=678&name=Unfold%20Unpacked_Blog%203%20%CE%93%C3%87%C3%B4%20operational%20insights.webp" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
