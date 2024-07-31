import React, { useState, useRef, useContext } from 'react';
import { HiOutlineArrowSmallLeft } from 'react-icons/hi2';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import supabase from '../../tools/config/connect';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { LanguageContext } from '../../context/Language';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form data of validation start
  const fullname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const imageLink = useRef(null);
  // form data of validation end 

  const registerSubmited = e => {
    e.preventDefault();

    if (
      !fullname.current.value ||
      !lastname.current.value ||
      !email.current.value ||
      !password.current.value ||
      !confirmPassword.current.value
    ) {
      Swal.fire(language === 'AZ' ? 'Zəhmət olmasa, bütün sahələri doldurun' : 'Please, fill input', '', 'warning');
    } else {
      const sendDataToDb = async () => {
        if (password.current.value !== confirmPassword.current.value) {
          Swal.fire(language === 'AZ' ? 'Şifrə uyğun deyil!' : 'Password is not equal!', '', 'error');
        } else {
          const hashedPassword = bcrypt.hashSync(password.current.value, 10);

          const createdUsers = async () => {
            const { error } = await supabase.from('Users').insert({
              fullname: fullname.current.value,
              lastname: lastname.current.value,
              email: email.current.value,
              password: hashedPassword,
              image: imageLink.current.value,
              token: crypto.randomUUID()
            });

            if (error) {
              Swal.fire(language === 'AZ' ? 'Bir problem baş verdi!' : 'Something went wrong!', '', 'error');
              console.log(error);
            } else {
              Swal.fire(language === 'AZ' ? 'Yeni hesab yaradıldı!' : 'New account has been created!', '', 'success');
              setTimeout(() => {
                window.location.assign('/login');
              }, 2000);
            }
          };

          const { data } = await supabase.from('Users').select();
          data.length === 0 ? createdUsers() : data.find(item => item.email === email.current.value) ?
            Swal.fire(language === 'AZ' ? 'Bu e-poçul artıq qeydiyyatdan keçib!' : 'This email is already registered!', '', 'warning') :
            createdUsers();
        }
      };
      sendDataToDb();
    }
  };

  // Use language context
  const [language] = useContext(LanguageContext);

  return (
    <div>
      <div className="register-page">
        <div className='register-side'>
          <div className='form-div'>
            <form className="form" onSubmit={registerSubmited}>
              <p className="title">{language === 'AZ' ? 'Qeydiyyat' : 'Register'}</p>
              <p className="message">{language === 'AZ' ? 'İndi qeydiyyatdan keçin və saytımıza tam giriş əldə edin.' : 'Register now and get full access to our site.'}</p>
              <div>
                <div className='d-flex justify-content-center'>
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MSPMMkrHOPpLPvlAfkGLNxnxE94UL0qH7iiPgZXiCSEpO57dSCksqZjHgJnyZHYma_8&usqp=CAU"
                    style={{ width: '30%', height: '30%', borderRadius: '50%', border: '1px solid black', objectFit: 'cover' }}
                    alt=""
                  />
                </div>
                <div className="input-field">
                  <input required="" className="input" type="text" ref={imageLink} />
                  <label className="label" htmlFor="input">{language === 'AZ' ? 'Şəkil linki' : 'Image link'}</label>
                </div>
              </div>
              <div className='d-flex' style={{ gap: '10px' }}>
                <div className="input-field">
                  <input required="" className="input" type="text" ref={fullname} />
                  <label className="label" htmlFor="input">{language === 'AZ' ? 'Ad' : 'First Name'}</label>
                </div>
                <div className="input-field">
                  <input required="" className="input" type="text" ref={lastname} />
                  <label className="label" htmlFor="input">{language === 'AZ' ? 'Soyad' : 'Last Name'}</label>
                </div>
              </div>

              <div className="input-field">
                <input required="" className="input" type="email" ref={email} />
                <label className="label" htmlFor="input">{language === 'AZ' ? 'E-poçul daxil edin' : 'Enter Email'}</label>
              </div>
              <div className="input-field">
                <div style={{ fontSize: '20px' }} className='showEye' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VscEyeClosed /> : <VscEye />}
                </div>
                <input required="" className="input" type={showPassword ? 'text' : 'password'} ref={password} />
                <label className="label" htmlFor="input">{language === 'AZ' ? 'Şifrə' : 'Password'}</label>
              </div>
              <div className="input-field">
                <div style={{ fontSize: '20px' }} className='showEye' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
                </div>
                <input required="" className="input" type={showConfirmPassword ? 'text' : 'password'} ref={confirmPassword} />
                <label className="label" htmlFor="input">{language === 'AZ' ? 'Şifrəni təsdiqləyin' : 'Confirm Password'}</label>
              </div>
              <button className="submit">{language === 'AZ' ? 'Qeydiyyat' : 'Register'}</button>
              <p className="login-link">
                <Link to='/login' className='d-flex align-items-center login-text'>
                  <HiOutlineArrowSmallLeft className='arrow' /> {language === 'AZ' ? 'Giriş' : 'Login'}
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className='register-image'>
          <img src="../src/assets/img/Register-Sing-Up.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
