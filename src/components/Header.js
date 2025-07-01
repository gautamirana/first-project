import React, { useState, useEffect, useRef } from 'react';
import '../styles/headerstyle.css'; // your styles

import facebookImage from '../assets/images/facebook.png';
import instaImage from '../assets/images/instagram.png';
import pinterestImage from '../assets/images/pinterest.png';
import twitterImage from '../assets/images/twitter.png';

import bgImage from '../assets/images/bg1.jpg';
import bgImage1 from '../assets/images/bg2.jpg';
import bgImage2 from '../assets/images/bg.jpg';
import bgImage3 from '../assets/images/background.png';
import serviceimg1 from '../assets/images/Service_img1.jpeg';

function Header({ speed = 15 }) {
  const images = [bgImage, bgImage1, bgImage2, bgImage3];
  const [panels, setPanels] = useState(images.map((img, i) => ({ img, key: i })));
  const [lefts, setLefts] = useState(images.map((_, i) => i * window.innerWidth));
  const intervalRef = useRef();

  // Create ref for the Service section
  const serviceRef = useRef();
const aboutRef = useRef();
  // Scroll handler
  const handleScrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // else if (aboutRef.current) {
    //    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    // }
  };

    const handleScrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLefts(prevLefts => {
        let newLefts = prevLefts.map(l => l - 0.8);
        if (newLefts[0] <= -window.innerWidth) {
          newLefts.push(newLefts.shift() + panels.length * window.innerWidth);
          setPanels(prev => {
            let moved = prev.shift();
            return [...prev, moved];
          });
        }
        return newLefts;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [panels.length, speed]);

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="leftSection">
          {/* Social Icons */}
          <a href="https://facebook.com" className="iconLink" aria-label="Facebook">
            <img src={facebookImage} alt="Facebook" className="icon" />
          </a>
          <a href="https://instagram.com" className="iconLink" aria-label="Instagram">
            <img src={instaImage} alt="Instagram" className="icon" style={{ width: '40px' }} />
          </a>
          <a href="https://pinterest.com" className="iconLink" aria-label="Pinterest">
            <img src={pinterestImage} alt="Pinterest" className="icon" style={{ marginRight: '6px' }} />
          </a>
          <a href="https://twitter.com" className="iconLink" aria-label="Twitter">
            <img src={twitterImage} alt="Twitter" className="icon" />
          </a>
          <span className="mobileNumber">+91 98765 43210</span>
        </div>
        {/* Login/Signup */}
        <div className="rightSection">
          <a href="/login" className="link">Login</a>
          <a href="/signup" className="link">Sign Up</a>
        </div>
      </header>

      {/* Background Image Slides */}
      <div style={{ position: 'relative', width: '99vw', height: '600px', overflow: 'hidden' }}>
        {panels.map((panel, i) => (
          <div  key={panel.key} className="panel" style={{ left: `${lefts[i]}px`, backgroundImage: `url(${panel.img})`, }} />
        ))}
        {/* Navigation Tabs */}
        <div className="navContainer">
          <a href="/" className="tab">Home</a>
          <button type="button" className="tab"  onClick={handleScrollToService} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Service
          </button>
          <a href="/" className="tab">Home</a>
          <button type="button" className="tab"  onClick={handleScrollToAbout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            About Us
          </button>
          <a href="/contact" className="tab">Contact Us</a>
          <a href="/extra" className="tab">Extra</a>
        </div>
      </div>

      {/* Service Section */}
    <div ref={serviceRef} className="serviceSection">
  {/* Service Title */}
  <h2>Services</h2>
  
  {/* Images with descriptions directly below the title */}
  <div className="imagesContainer">
    {/* Image 1 */}
    <div className="imageCard">
      <img src={serviceimg1} alt="Description 1" className="serviceImage" />
      <p className="description">Heena Body Tattoos</p>
      <p className="description">Mehndi, also known as henna, is a temporary body art 
        tradition involving the application of a paste made from the henna plant's 
        leaves to the skin</p>
    </div>

    {/* Image 2 */}
    <div className="imageCard">
       <img src={serviceimg1} alt="Description 2" className="serviceImage" />
      <p className="description">Description for image 2</p>
      <p className="description">Mehndi, also known as henna, is a temporary body art 
        tradition involving the application of a paste made from the henna plant's 
        leaves to the skin</p>
    </div>
    {/* Image 3 */}
    <div className="imageCard">
      <img src={serviceimg1} alt="Description 3" className="serviceImage" />
      <p className="description">Description for image 3</p>
      <p className="description">Mehndi, also known as henna, is a temporary body art 
        tradition involving the application of a paste made from the henna plant's 
        leaves to the skin</p>
    </div>
    {/* Image 4 */}
    <div className="imageCard">
       <img src={serviceimg1} alt="Description 4" className="serviceImage" />
      <p className="description">Description for image 4</p>
      <p className="description">Mehndi, also known as henna, is a temporary body art 
        tradition involving the application of a paste made from the henna plant's 
        leaves to the skin</p>
    </div>
  </div>
</div>
<div ref={aboutRef} className="serviceSection">
  <h2>About Us</h2>
  <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', color: '#333' }}>
    <p>
      Welcome to our Photography & Mehndi Studio! We are passionate artists dedicated to capturing your special moments and adorning your celebrations with beautiful henna designs.
    </p>
    <p>
      With years of experience in photography and traditional body art, our team ensures every client receives personalized attention and creative excellence. Whether it’s a wedding, festival, or a personal photoshoot, we strive to make your experience memorable.
    </p>
    <p>
      Thank you for trusting us to be a part of your story!
    </p>
  </div>
</div>
    </>
  );
}

export default Header;