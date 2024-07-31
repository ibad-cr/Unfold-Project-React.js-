import React from 'react'
import { TfiPlus } from "react-icons/tfi";
import { LanguageContext } from '../../context/Language';
import { useContext } from 'react';

const PartnersSingleCard = ({ data }) => {

    // ====================================Language========================================
    const [language, setLanguage] = useContext(LanguageContext);

    return (
        <>
            <div className='single-card-element'>
                <div className='container'>
                    <div className='cards border-bottom' >
                        <h3 className='mb-4'>{language === 'AZ' ? data.languageCategory : data.category}</h3>
                        <div className='headline-partner'>
                            <div className="row row-cols-12 row-cols-md-12" >
                                <div className="col">
                                    <div className="card" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" >
                                        <div className="card-body">
                                            <img src={data.logo} alt={data.logo} className='partners-logo-image' />
                                            <div className='information-button'>
                                                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                                    <div class="modal-dialog modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">{data.category}</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <p>{data.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className='plus-button'><span className='d-flex align-items-center'><TfiPlus style={{ width: '12px', height: '12px' }} /></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PartnersSingleCard