import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import '../src/assets/sass/style.scss';

// ======================BOOTSTRAP======================================================================
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js';

// ======================SLICKSLIDER======================================================================
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ======================SWIPERJS======================================================================
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ======================USECONTEXT======================================================================
import { SpeakersProvider } from './context/SpeakersContext.jsx';
import { ModeProvider } from './context/Mode.jsx';
import { FaqProvider } from './context/FaqContext.jsx';
import { shopData, userData } from './tools/func/calldata.jsx';
import { LanguageProvider } from './context/Language.jsx';
import { Provider } from 'react-redux';
import store from './tools/store/shopStore.js';
import 'animate.css';

// ======================AOS======================================================================
import 'aos/dist/aos.css'

shopData();
userData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ModeProvider>
        <SpeakersProvider>
          <FaqProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </FaqProvider>
        </SpeakersProvider>
      </ModeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
