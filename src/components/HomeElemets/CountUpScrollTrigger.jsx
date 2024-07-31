import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { LanguageContext } from '../../context/Language';

const CountUpScrollTrigger = () => {
  const [counterOn, setCounterOn] = useState(false);

  const [language, setLanguage] = useContext(LanguageContext);

  return (
    <>
      <div className='participants'>
        <div className='d-flex align-items-center'>
          <div className='measure d-flex align-items-center justify-content-center flex-column' data-aos="fade-left"
            data-aos-duration="500">
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
              <h1>
                {counterOn && <CountUp start={0} end={900} duration={4} delay={0} />}
                +
              </h1>
            </ScrollTrigger>
            <p>{language === 'AZ' ? 'İştirakçılar' : 'Attendees'}</p>
          </div>
          <div className='mx-3' data-aos="zoom-out"
            data-aos-duration="1000">
            <img src="../src/assets/img/placeholder-small-2-720x-q72.png" alt="" style={{ width: '180px', borderRadius: '50%' }} />
          </div>
          <div className='measure d-flex align-items-center justify-content-center flex-column' data-aos="fade-right"
            data-aos-duration="1000">
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
              <h1>
                {counterOn && <CountUp start={0} end={20} duration={4} delay={0} />}
              </h1>
            </ScrollTrigger>
            <p>{language === 'AZ' ? 'Sessiyalar' : 'Sessions'}</p>
          </div>

        </div>

        <div className='participants-wrapper mt-3'>
          <div className="participants-container">
            <div className='d-flex align-items-center'>
              <div className='mx-3' data-aos="zoom-out"
                data-aos-duration="1000">
                <img src="../src/assets/img/placeholder-small-1-720x-q72.png" alt="" style={{ width: '180px', borderRadius: '50%' }} />
              </div>
              <div className='measure d-flex align-items-center justify-content-center flex-column'>
                <h1>1</h1>
                <p>{language === 'AZ' ? 'Qaçırılmaz günlər' : 'Unmissable day'}</p>
              </div>
              <div className='mx-3' data-aos="zoom-out"
                data-aos-duration="1000">
                <img src="../src/assets/img/placeholder-small-3-720x-q72.png" alt="" style={{ width: '180px', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='responsive-participants-part'>
        <div className='d-flex mb-3' style={{ gap: '15px' }}>
          <div className='measure-responsive d-flex align-items-center justify-content-center flex-column' data-aos="fade-left"
            data-aos-duration="1000">
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
              <h1>
                {counterOn && <CountUp start={0} end={900} duration={4} delay={0} />}
                +
              </h1>
            </ScrollTrigger>
            <p>{language === 'AZ' ? 'İştirakçılar' : 'Attendees'}</p>
          </div>
          <div data-aos="zoom-out"
            data-aos-duration="1000">
            <img src="../src/assets/img/placeholder-small-2-720x-q72.png" alt="" style={{ width: '120px', borderRadius: '50%' }} />
          </div>
        </div>

        <div className='d-flex mb-3' style={{ gap: '15px' }}>
          <div data-aos="zoom-out"
            data-aos-duration="1000">
            <img src="../src/assets/img/placeholder-small-1-720x-q72.png" alt="" style={{ width: '120px', borderRadius: '50%' }} />
          </div>
          <div className='measure-responsive d-flex align-items-center justify-content-center flex-column' data-aos="fade-right"
            data-aos-duration="1000">
            <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
              <h1>
                {counterOn && <CountUp start={0} end={20} duration={4} delay={0} />}
              </h1>
            </ScrollTrigger>
            <p>{language === 'AZ' ? 'Sessiyalar' : 'Sessions'}</p>
          </div>
        </div>

        <div className='d-flex' style={{ gap: '15px' }} data-aos="fade-left"
          data-aos-duration="1000">
          <div className='measure-responsive d-flex align-items-center justify-content-center flex-column'>
            <h1>1</h1>
            <p>{language === 'AZ' ? 'Qaçırılmaz günlər' : 'Unmissable day'}</p>
          </div>
          <div data-aos="zoom-out"
            data-aos-duration="1000">
            <img src="../src/assets/img/placeholder-small-3-720x-q72.png" alt="" style={{ width: '120px', borderRadius: '50%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CountUpScrollTrigger