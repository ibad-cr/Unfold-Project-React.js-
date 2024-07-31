import React, { useState, useEffect, useRef, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CiCirclePlus } from 'react-icons/ci';
import supabase from '../tools/config/connect';
import Swal from 'sweetalert2';
import Preloader from '../components/Preloader';
import { LanguageContext } from '../context/Language';
import Aos from 'aos';

const Blog = () => {
  const [cookie] = useCookies(['cookie-ticket']);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const usersBlog = async () => {
      const { data, error } = await supabase.from('BlogPage').select();
      if (error) {
        console.log(error);
      } else {
        setBlog(data);
      }
    };
    usersBlog();
  }, []);


  const findBlogInformation = blog.filter(item => item.blog_user_token === cookie['cookie-ticket']);

  const user = useSelector(item => item.user)
  const filterUsersData = user.length == 0 ? "" : user.find(item => item.token === cookie['cookie-ticket'])

  // =============================================DELETE==================================================
  const [deleteBlog, setDeleteBlog] = useState([]);

  const deleteInformation = async (id) => {
    const { error } = await supabase
      .from('BlogPage')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error deleting blog post:', error);
    } else {
      const updatedBlog = findBlogInformation.filter((item) => item.id !== id);
      setDeleteBlog(updatedBlog);
      window.location.reload();
    }

  };

  // =============================================EDIT==================================================
  const [editBlog, setEditBlog] = useState([]);
  const textAreaRef = useRef();
  const categoryRef = useRef();

  if (!categoryRef || !textAreaRef) {
    Swal.fire('Please cooise category', '', 'warning')
  }

  const editInformation = async (id) => {
    const updatedInformation = textAreaRef.current.value;
    const updatedCategory = categoryRef.current.value;

    const { error } = await supabase.from('BlogPage')
      .update({ blog_user_token: cookie["cookie-ticket"], information: updatedInformation, category: updatedCategory })
      .eq('id', id)

    if (error) {
      console.log(error);
    } else {
      if (!categoryRef.current.value || !textAreaRef.current.value) {
        Swal.fire('Please fill input', '', 'warning')
      } else {
        const uptadeInformationBlog = findBlogInformation.filter((item) => item.id !== id)
        setEditBlog(uptadeInformationBlog);
        Swal.fire('Success', '', 'success')
        window.location.reload();
      }
    }
  }

  // ====================================Language========================================
  const [language, setLanguage] = useContext(LanguageContext);

    // ======================AOS======================================================================
    useEffect(() => {
      Aos.init();
    }, [])

  return (
    <div>
      {findBlogInformation === undefined ? (
        <div><Preloader /></div>
      ) : (
        <div className='blog-page my-5'>
          <div className='container'>
            <div className='mb-4'>
              {cookie['cookie-ticket'] === undefined ?
                <Link to='/login' className='d-flex plus-and-add-buttons' style={{ textDecoration: 'none', color: 'black' }}>
                  <div className='d-flex align-items-center'>
                    <CiCirclePlus style={{ fontSize: '25px' }} />
                    <button className='blog-add-button'>{language === 'AZ' ? 'Əlavə et' : 'Add'}</button>
                  </div>
                </Link> :
                <Link to='/blog/blogSingleCard' className='plus-and-add-buttons'>
                  <div className='d-flex align-items-center'>
                    <CiCirclePlus style={{ fontSize: '25px' }} />
                    <button className='blog-add-button'>{language === 'AZ' ? 'Əlavə et' : 'Add'}</button>
                  </div>
                </Link>}
              <div className='blog-line mt-2'></div>
            </div>
            <div className="">
              <>
                {findBlogInformation.map((item, index) => (
                  <>
                    <div className='' key={index} >
                      <div className="blog-users-items mb-3 mt-4">
                        {filterUsersData == undefined ? <div>Loading...</div> :
                          <div className='information-edit-delete-button' style={{ border: 'none', borderRadius: '50em', background: '#dfddf5', padding: '3px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div className='blog-users-logo'>
                                <img src={filterUsersData.image} alt="" />
                              </div>
                              <div className='blog-users-email mx-2'>
                                <h6>{filterUsersData.fullname}</h6>
                                <h6 style={{ fontSize: '13px' }}>{filterUsersData.email}</h6>
                              </div>
                            </div>
                            <div className='edit-and-trash-buttons'>
                              <div className='blog-edit-button'>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ background: 'none', border: 'none' }}>
                                  <button class="editBtn">
                                    <svg height="1em" viewBox="0 0 512 512">
                                      <path
                                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                      ></path>
                                    </svg>
                                  </button>
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">{language === 'AZ' ? 'Məlumatı yeniləyin' : 'Uptade information'}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                        <select id="tickets" ref={categoryRef} className='mb-3'>
                                          <option value="Your ticket category" disabled selected>{language === 'AZ' ? 'Yeni bilet kateqoriyası' : 'New ticket category'}</option>
                                          <option value="Mastering data-driven insights">Mastering data-driven insights</option>
                                          <option value="Oiling your operational engine">Oiling your operational engine</option>
                                          <option value="The importance of integrations">The importance of integrations</option>
                                          <option value="Transformational hospitality">Transformational hospitality</option>
                                          <option value="Changing hospitality landscape">Changing hospitality landscape</option>
                                          <option value="Industry-shaping innovations">Industry-shaping innovations</option>
                                          <option value="Revenue beyond rooms">Revenue beyond rooms</option>
                                          <option value="Hospitality investment">Hospitality investment</option>
                                          <option value="TransformatiMastering revenue managementona">Mastering revenue management</option>
                                        </select>

                                        <textarea
                                          className='blog-modal-textarea'
                                          placeholder={language === 'AZ' ? 'Yeni rəy' : 'New opinion'}
                                          ref={textAreaRef}
                                          rows={3}></textarea>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">{language === 'AZ' ? 'Ləğv et' : 'Cancel'}</button>
                                        <button type="button" class="btn btn-success" onClick={() => {
                                          editInformation(item.id)
                                        }}>{language === 'AZ' ? 'Yadda saxla' : 'Save changes'}</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="blog-trash-button">
                                <button class="btn" onClick={() => {
                                  deleteInformation(item.id);
                                }}>
                                  <svg viewBox="0 0 15 17.5" height="17.5" width="13" xmlns="http://www.w3.org/2000/svg" class="icon">
                                    <path transform="translate(-2.5 -1.25)" d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z" id="Fill"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                      <div className='blog-users-opinion'>
                        <div className='blog-users-opinion-category'><span>{language === 'AZ' ? 'Bilet' : 'Tickets'} - </span>{item.category}</div>
                        <div className='mt-3 blog-users-information'>{item.information}</div>
                      </div>
                    </div>
                  </>
                ))}
              </>
              <div className='blog-example-single-card' data-aos="fade-up" data-aos-duration="1000">
                {/* ==============================Jane================================================== */}
                <div >
                  <div className="blog-users-items mb-3 mt-4">
                    <div className='information-edit-delete-button' style={{ border: 'none', borderRadius: '50em', background: '#dfddf5', padding: '3px' }}>
                      <div className='d-flex align-items-cenetr'>
                        <div className='blog-users-logo'>
                          <img src='https://hips.hearstapps.com/hmg-prod/images/gettyimages-149927442-1603797114.jpg' alt="" />
                        </div>
                        <div className='blog-users-email mx-2'>
                          <h6>Jane</h6>
                          <h6 style={{ fontSize: '13px' }}>jane.doe@yahoo.com</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='blog-users-opinion'>
                    <div className='blog-users-opinion-category'><span>{language === 'AZ' ? 'Bilet' : 'Tickets'} - </span>The importance of integrations</div>
                    <div className='mt-3 blog-users-information'>The importance of integrations cannot be overstated in today's interconnected world. Seamless integration between various systems and applications ensures efficiency, enhances productivity, and provides a holistic view of operations, leading to better strategic decisions.</div>
                  </div>
                </div>

                {/* ==============================Michael================================================== */}
                <div data-aos="fade-up" data-aos-duration="1200">
                  <div className="blog-users-items mb-3 mt-4">
                    <div className='information-edit-delete-button' style={{ border: 'none', borderRadius: '50em', background: '#dfddf5', padding: '3px' }}>
                      <div className='d-flex align-items-cenetr'>
                        <div className='blog-users-logo'>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-boqzkS5Yc1ncScXed9JgvkvBUOVy5Pv7w&s' alt="" />
                        </div>
                        <div className='blog-users-email mx-2'>
                          <h6>Michael</h6>
                          <h6 style={{ fontSize: '13px' }}>michael.smith@outlook.com</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='blog-users-opinion'>
                    <div className='blog-users-opinion-category'><span>{language === 'AZ' ? 'Bilet' : 'Tickets'} - </span>Industry-shaping innovations</div>
                    <div className='mt-3 blog-users-information'>Industry-shaping innovations drive progress and create competitive advantages. Embracing cutting-edge technologies and innovative approaches helps companies stay ahead in the market, adapt to changing demands, and meet customer needs more effectively.</div>
                  </div>
                </div>

                {/* ==============================John================================================== */}
                <div >
                  <div className="blog-users-items mb-3 mt-4">
                    <div className='information-edit-delete-button' style={{ border: 'none', borderRadius: '50em', background: '#dfddf5', padding: '3px' }}>
                      <div className='d-flex align-items-cenetr'>
                        <div className='blog-users-logo'>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2e-6CihWAXiH1smx8LSVli3ACyRKn--y6w&s' alt="" />
                        </div>
                        <div className='blog-users-email mx-2'>
                          <h6>John</h6>
                          <h6 style={{ fontSize: '13px' }}>djohnson@domain.com</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='blog-users-opinion'>
                    <div className='blog-users-opinion-category'><span>{language === 'AZ' ? 'Bilet' : 'Tickets'} - </span>Mastering data-driven insights</div>
                    <div className='mt-3 blog-users-information'>Mastering data-driven insights is crucial for making informed business decisions. By leveraging data effectively, organizations can uncover trends, predict future outcomes, and create more personalized customer experiences.</div>
                  </div>
                </div>

                {/* ==============================Emily================================================== */}
                <div data-aos="fade-up" data-aos-duration="1200">
                  <div className="blog-users-items mb-3 mt-4">
                    <div className='information-edit-delete-button' style={{ border: 'none', borderRadius: '50em', background: '#dfddf5', padding: '3px' }}>
                      <div className='d-flex align-items-cenetr'>
                        <div className='blog-users-logo'>
                          <img src='https://hips.hearstapps.com/hmg-prod/images/elm040124ppwomenofimpact-010-emily-weiss-65f1baacbb89c.jpg' alt="" />
                        </div>
                        <div className='blog-users-email mx-2'>
                          <h6>Emily</h6>
                          <h6 style={{ fontSize: '13px' }}>emily.jones@gmail.com</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='blog-users-opinion'>
                    <div className='blog-users-opinion-category'><span>{language === 'AZ' ? 'Bilet' : 'Tickets'} - </span>Hospitality investment</div>
                    <div className='mt-3 blog-users-information'>Hospitality investment plays a significant role in driving economic growth and enhancing customer experiences. By investing in hospitality, companies can build stronger relationships with customers, improve service quality, and increase overall satisfaction.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
