import React, { useRef, useContext } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { LanguageContext } from '../context/Language';
import { useEffect } from 'react';
import Aos from 'aos';

const Contact = () => {
  const form = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const category = useRef();
  const textarea = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!firstName.current.value || !lastName.current.value || !email.current.value || !category.current.value || !textarea.current.value) {
      Swal.fire('Please fill in all fields', '', 'warning');
    } else {
      emailjs.sendForm('service_xbboplc', 'template_2h5talh', form.current, 'UM-VUx03iY6aWUOzY')
        .then(
          () => {
            console.log('SUCCESS!');
            Swal.fire('Your message has been sent', '', 'success');
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        );
    }
  };

  // ====================================Language========================================
  const [language] = useContext(LanguageContext);

  const texts = {
    title: language === 'AZ' ? 'Bizimlə əlaqə saxlayın' : 'Contact Us',
    inquiry: language === 'AZ'
      ? 'Hər hansı bir sorğunuz varsa, sizdən eşitməkdən məmnun olarıq. Mews komandası sizə mümkün qədər tez qayıdacaq.'
      : 'Whatever your inquiry, we\'d be happy to hear from you. Contact the Mews team and we’ll get back to you as fast as we can.',
    sales: language === 'AZ' ? 'Satış' : 'Sales',
    support: language === 'AZ' ? 'Dəstək' : 'Support',
    emergencies: language === 'AZ' ? 'Təcili Hallar' : 'Emergencies',
    selectTicket: language === 'AZ' ? 'Bilet seçin' : 'Please select ticket',
    agreeUpdates: language === 'AZ' ? 'Bəli, mən Mews-dən sorğumla əlaqədar yeniləmələr almayı razıyam.' : 'Yes, I agree to receive updates from Mews in relation to my request.',
    agreeNewsletter: language === 'AZ' ? 'Bəli, mən dünya üzrə qonaqpərvərlik xəbərləri üçün aylıq bülleteninizə abunə olmaq istəyirəm.' : 'Yes, I want to be subscribed to your monthly newsletter for hospitality hot takes from around the world.',
    privacyPolicy: language === 'AZ' ? 'Mews Məxfilik Siyasəti' : 'Mews Privacy Policy',
    submitText: language === 'AZ' ? 'Göndər' : 'Submit'
  };

  // ======================AOS======================================================================
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className='contact-page'>
      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-elemets">
            <div className='contact-left-side' data-aos="zoom-out" data-aos-duration="1000">
              <p className="title mb-3">{texts.title}</p>
              <p className='contact-users-inquiry'>{texts.inquiry}</p>
              <div className='contact-list mt-3'>
                <div className='sales-title'>
                  <p className='fw-bold'>{texts.sales}</p>
                  <ul className='my-3'>
                    <li>{language === 'AZ' ? 'Burada demo planlaşdırın' : 'Schedule a demo here'} <a href="#">{language === 'AZ' ? 'burada' : ' here'}</a></li>
                  </ul>
                </div>
                <div className='support-title'>
                  <p className='my-3 fw-bold'>{texts.support}</p>
                  <ul>
                    <li>{language === 'AZ' ? 'Ziyarət edin' : ' Visit our'} <a href="#">{language === 'AZ' ? 'Yardım Mərkəzimizi ' : 'Help Center'}</a></li>
                    <li className='my-3'>{language === 'AZ' ? 'Mews qonaqpərvərlik (PMS) məhsulları -' : ' Mews hospitality (PMS) products -'} <a href="#">{language === 'AZ' ? 'Burada' : ' Here'}</a></li>
                    <li>{language === 'AZ' ? 'POS ilə kömək -' : ' Help with POS -'} <a href="#">{language === 'AZ' ? 'Burada' : ' Here'}</a></li>
                  </ul>
                </div>
                <div className='emergencies-title'>
                  <p className='fw-bold my-3'>{texts.emergencies}</p>
                  <p style={{ fontSize: '15px' }}>
                    {language === 'AZ' ? 'Əgər kritik problemlə üzləşirsinizsə, bizə 24/7 zəng edə bilərsiniz – dəstək nömrələrimizdən istifadə edin' : 'If you’re experiencing a critical problem, you can call us 24/7 – use our support numbers in the'} <a href="#">{language === 'AZ' ? 'Bizi necə tapmaq olar' : 'How to find us'}</a> {language === 'AZ' ? 'aşağıda bölmə.' : 'section below.'}
                  </p>
                </div>
              </div>
            </div>
            <div className='contact-right-side' data-aos="zoom-out" data-aos-duration="1000">
              <form className="form" ref={form} onSubmit={sendEmail}>
                <div className='d-flex' style={{ gap: '10px' }}>
                  <div className="input-field">
                    <input required className="input" type="text" name="user_name" ref={firstName} />
                    <label className="label" htmlFor="input">{language === 'AZ' ? 'Ad' : 'First Name'}</label>
                  </div>
                  <div className="input-field">
                    <input required className="input" type="text" name="user_last_name" ref={lastName} />
                    <label className="label" htmlFor="input">{language === 'AZ' ? 'Soyad' : 'Last Name'}</label>
                  </div>
                </div>
                <div>
                  <div className="input-field">
                    <input required className="input" type="text" name="user_email" ref={email} />
                    <label className="label" htmlFor="input">example@gmail.com</label>
                  </div>
                </div>
                <div className="contact-option-elemets">
                  <select id="tickets" className='mb-3' name="message" ref={category} defaultValue="">
                    <option value="" disabled>{texts.selectTicket}</option>
                    <option value="Mastering data-driven insights">Mastering data-driven insights</option>
                    <option value="Oiling your operational engine">Oiling your operational engine</option>
                    <option value="The importance of integrations">The importance of integrations</option>
                    <option value="Transformational hospitality">Transformational hospitality</option>
                    <option value="Changing hospitality landscape">Changing hospitality landscape</option>
                    <option value="Industry-shaping innovations">Industry-shaping innovations</option>
                    <option value="Revenue beyond rooms">Revenue beyond rooms</option>
                    <option value="Hospitality investment">Hospitality investment</option>
                    <option value="Mastering revenue management">Mastering revenue management</option>
                  </select>
                </div>
                <div className='contact-textarea'>
                  <textarea rows={6} placeholder={language === 'AZ' ? 'Mesaj' : 'Message'} name="message" ref={textarea}></textarea>
                </div>
                <div className='contact-check-button'>
                  <div>
                    <input type="checkbox" />
                    <span className='mx-2'>{texts.agreeUpdates}</span>
                  </div>
                  <div className='my-2'>
                    <input type="checkbox" />
                    <span className='mx-2'>{texts.agreeNewsletter}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px' }}>
                      {language === 'AZ' ? '"Göndər" düyməsini klikləməklə, sorğunuz üçün şəxsi məlumatlarınızın işlənməsi ilə razılaşırsınız. Ətraflı məlumat üçün bizimlə əlaqə saxlayın' : 'By clicking "Submit", you agree to your personal data being processed for the purpose of your request. For more information visit our'} <a href="#" style={{ color: 'black' }}>{texts.privacyPolicy}</a>. {language === 'AZ' ? 'İstənilən vaxt bu kommunikasiyalara abunəlikdən çıxa bilərsiniz.' : 'You can unsubscribe from these communications at any time.'}
                    </p>
                  </div>
                  <div className='contact-submit-button mt-5'>
                    <button type='submit' value="Send">{texts.submitText}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
