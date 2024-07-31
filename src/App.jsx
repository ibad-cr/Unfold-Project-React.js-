import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Speakers from './pages/Speakers';
import Shop from './pages/Shop';
import Partners from './pages/Partners';
import Faq from './pages/Faq';
import AddToCart from './components/AddToCart.jsx';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Account from './pages/auth/Account';
import Blog from './pages/Blog.jsx';
import BlogSingleCard from './components/BlogElements/BlogSingleCard.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ReadMore from './components/ShopElements/ReadMore.jsx';
import Contact from './pages/Contact.jsx';
import Wishlist from './components/Wishlist.jsx';
import CompleteOrder from './components/CompleteOrder.jsx';
import AddTicketByAdmin from './components/ShopElements/AddTicketByAdmin.jsx';
import { Outlet } from 'react-router-dom';
import 'animate.css';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import OrderRecommedProductsSlickSlide from './pages/auth/OrderRecommedProductsSlickSlide.jsx';

const App = () => {
  // const [loader, setLoader] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false);
  //     console.log('Success');
  //   }, 3000);
  // }, []);

  // if (loader) {
  //   return <PreloaderHome />;
  // }

  return (
    <div className=''>
      <div style={{ position: 'fixed', zIndex: '10000', bottom: '60px', right: '20px' }}>
        <ScrollToTopButton />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          }>
            <Route path='/' element={<Home />} />
            <Route path='/speakers' element={<Speakers />} />
            <Route path='/tickets' element={<Shop />} />
            <Route path='/tickets/:slug' element={<ReadMore />} />
            <Route path='/tickets/addToCard' element={<AddToCart />} />
            <Route path='/tickets/wishlist' element={<Wishlist />} />
            <Route path='/tickets/addToCart/completeOrder' element={<CompleteOrder />} />
            <Route path='/tickets/addTicketByAdmin' element={<AddTicketByAdmin />} />
            <Route path='/partners' element={<Partners />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account/:token' element={<Account />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/blogSingleCard' element={<BlogSingleCard />} />
            <Route path='/orderRecommedProductsSlickSlide' element={<OrderRecommedProductsSlickSlide />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
