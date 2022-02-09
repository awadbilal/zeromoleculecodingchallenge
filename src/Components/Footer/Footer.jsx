import React from 'react';
import Img1 from '../../locales/images/footer1.png';
import Img2 from '../../locales/images/footer2.png';
import './style.css';

function Footer() {
  return (
    <div className="footer">
      <img src={Img1} alt="Footer " className='image' />
      <img src={Img2} alt="Footer 2" className='image' />
    </div>
  );
}

export default Footer;
