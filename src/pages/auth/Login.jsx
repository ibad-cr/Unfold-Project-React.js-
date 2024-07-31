import React, { useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import supabase from '../../tools/config/connect';
import { useCookies } from 'react-cookie';
import { CiCircleAlert } from 'react-icons/ci';
import bcrypt from 'bcryptjs';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { LanguageContext } from '../../context/Language';

const admin = {
  email: 'admin@gmail.com',
  password: 'admin123',
  tokenAdmin: '000000000000'
}

const Login = () => {

  // form data of validation start
  const email = useRef(null);
  const password = useRef(null);
  // form data of validation end 

  const [cookies, setCookie] = useCookies(['cookie-ticket', 'adminToken']);
  const [showPassword, setShowPassword] = useState(false);


  const loginSubmited = e => {
    e.preventDefault();

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue) {
      Swal.fire(language === 'AZ' ? 'Xahiş edirəm, bütün sahələri doldurun' : 'Please, fill input', '', 'warning');
    } else {
      if (admin.email === email.current.value && admin.password === password.current.value) {
        setCookie('adminToken', admin.tokenAdmin);
        setTimeout(() => {
          window.location.assign('/')
        }, 1000);
      } else {
        const checkLogin = async () => {
          const createCookie = (token) => {
            setCookie('cookie-ticket', token);
            Swal.fire(language === 'AZ' ? 'Giriş uğurludur!' : 'Login is successful!', '', 'success');
            setTimeout(() => {
              window.location.assign('/');
            }, 1500);
          };

          const { data } = await supabase.from('Users').select();
          const userFiltered = data.find(item => item.email === emailValue);
          if (!userFiltered) {
            Swal.fire(language === 'AZ' ? 'Email və ya şifrə yanlışdır!' : 'Email or password is wrong!', '', 'error');
          } else {
            if (bcrypt.compareSync(passwordValue, userFiltered.password)) {
              createCookie(userFiltered.token);
              localStorage.setItem('userName', userFiltered.fullname);
            } else {
              Swal.fire(language === 'AZ' ? 'Email və ya şifrə yanlışdır!' : 'Email or password is wrong!', '', 'error');
            }
          }
        }
        checkLogin();
      }
    }
  };

  // ====================================Language========================================
  const [language] = useContext(LanguageContext);

  return (
    <div>
      <div className="login-page">
        <div className='login-side'>
          <div className='form-div'>
            <form className="form" onSubmit={loginSubmited}>
              <p className="title">{language === 'AZ' ? 'Daxil ol' : 'Login'}</p>
              <p className="message">{language === 'AZ' ? 'İndi daxil olun və saytımızın tam girişini əldə edin.' : 'Log in now and get full access to our site.'}</p>

              <div className="input-field">
                <input ref={email} required='' className="input" type="text" />
                <label className="label" htmlFor="input">{language === 'AZ' ? 'E-poçulu daxil edin' : 'Enter Email'}</label>
              </div>
              <div className="input-field">
                <div style={{ fontSize: '20px' }} className='showEye' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VscEyeClosed /> : <VscEye />}
                </div>
                <input required="" className="input" type={showPassword ? 'text' : 'password'} ref={password} />
                <label className="label" htmlFor="input">{language === 'AZ' ? 'Şifrə' : 'Password'}</label>
              </div>
              <button className="submit">{language === 'AZ' ? 'Giriş' : 'Login'}</button>
              <p className="signin d-flex align-items-center">
                <CiCircleAlert style={{ fontSize: '25px', paddingRight: '5px' }} />
                {language === 'AZ' ? 'Hesabınız yoxdur?' : "Don't have an account?"}
                <Link className='mx-2' to="/register">{language === 'AZ' ? 'Qeydiyyatdan keçin' : 'Register'}</Link>
              </p>
            </form>
          </div>
        </div>
        <div className='login-image'>
          <img src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
