import React, { useState, useEffect, useRef } from "react";
import "../styles/headerstyle.css"; // your styles
// import { Link } from 'react-router-dom';
import axios from "axios";

import bgImage from "../assets/images/bg1.jpg";
import bgImage1 from "../assets/images/bg2.jpg";
import bgImage2 from "../assets/images/bg.jpg";
import bgImage3 from "../assets/images/background.png";
import serviceimg1 from "../assets/images/Service_img1.jpeg";

import {
  FaUserTie,
  FaHeart,
  FaStar,
  FaSmile,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { PiFacebookLogoBold } from "react-icons/pi";
import { TbBrandPinterest } from "react-icons/tb";

function Header({ speed = 15 }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/inquiry/submit",
        formData
      );
      alert(response.data.message);
      setFormData({ fullName: "", email: "", mobile: "", message: "" });
    } catch (error) {
      alert("Submission failed!");
      console.error(error);
    }
  };

  const images = [bgImage, bgImage1, bgImage2, bgImage3];
  const [panels, setPanels] = useState(
    images.map((img, i) => ({ img, key: i }))
  );
  const [lefts, setLefts] = useState(
    images.map((_, i) => i * window.innerWidth)
  );
  const intervalRef = useRef();

  // Create ref for the Service section
  const serviceRef = useRef();
  const aboutRef = useRef();
  const whyUsRef = useRef();
  const contactRef = useRef();
  // Scroll handler
  const handleScrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToWhyUs = () => {
    if (whyUsRef.current) {
      whyUsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLefts((prevLefts) => {
        let newLefts = prevLefts.map((l) => l - 0.8);
        if (newLefts[0] <= -window.innerWidth) {
          newLefts.push(newLefts.shift() + panels.length * window.innerWidth);
          setPanels((prev) => {
            let moved = prev.shift();
            return [...prev, moved];
          });
        }
        return newLefts;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [panels.length, speed]);
  const services = [
    {
      title: "Heena Body Tattoos",
      img: serviceimg1,
      description:
        "Mehndi, also known as henna, is a temporary body art tradition involving the application of a paste made from the henna plant's leaves to the skin",
    },
    {
      title: "Bridal Mehndi",
      img: serviceimg1,
      description:
        "Intricate and beautiful mehndi designs for brides, making your special day even more memorable.",
    },
    {
      title: "Party Mehndi",
      img: serviceimg1,
      description:
        "Quick and stylish mehndi designs perfect for parties and festive occasions.",
    },
    {
      title: "Kids Mehndi",
      img: serviceimg1,
      description: "Fun and simple mehndi designs specially crafted for kids.",
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="leftSection">
          {/* Social Icons */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PiFacebookLogoBold size={25} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={25} />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandPinterest size={25} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={22} />
          </a>

          <span className="mobileNumber">+91 98765 43210</span>
        </div>
        {/* Login/Signup */}
        <div className="rightSection">
          <a href="/login" className="link">
            Login
          </a>
          <a href="/signup" className="link">
            Sign Up
          </a>
        </div>
      </header>

      {/* Background Image Slides */}
      <div
        style={{
          position: "relative",
          width: "99vw",
          height: "850px",
          overflow: "hidden",
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={panel.key}
            className="panel"
            style={{
              left: `${lefts[i]}px`,
              backgroundImage: `url(${panel.img})`,
            }}
          />
        ))}
        {/* Navigation Tabs */}
        <div className="navContainer">
          <a href="/" className="tab">
            Home
          </a>
          <button type="button" className="tab" onClick={handleScrollToService}>
            {" "}
            Service{" "}
          </button>
          <button type="button" className="tab" onClick={handleScrollToAbout}>
            {" "}
            About Us{" "}
          </button>
          <button type="button" className="tab" onClick={handleScrollToContact}>
            Contact Us{" "}
          </button>
          <button type="button" className="tab" onClick={handleScrollToWhyUs}>
            {" "}
            Why Us{" "}
          </button>
          <a href="/gallery" className="tab" target="_self">
            Gallery
          </a>
          <a href="/videos" className="tab" target="_self">
            Videos
          </a>{" "}
          {/* <-- Add this line */}
        </div>
      </div>

      {/* SERVICE SECTION */}
      <div ref={serviceRef} className="serviceSection">
        {/* Service Title */}
        {/* <h2>Services</h2> */}
        <h2 className="beautiful-title">Services</h2>
        <br />
        <div className="imagesContainer">
          {services.map((service, idx) => (
            <div className="imageCard" key={idx}>
              <img
                src={service.img}
                alt={service.title}
                className="serviceImage"
              />
              <p className="title">{service.title}</p>
              <br />
              <p className="description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}

      <div ref={aboutRef} className="serviceSection">
        <h2 className="beautiful-title">About Us</h2>
        <div className="imageCard">
          <img src={serviceimg1} alt="Description 4" className="serviceImage" />
        </div>
        <div className="aboutSectionParagraph">
          <p>
            Welcome to our Photography & Mehndi Studio! We are passionate
            artists dedicated to capturing your special moments and adorning
            your celebrations with beautiful henna designs.
          </p>
          <p>
            With years of experience in photography and traditional body art,
            our team ensures every client receives personalized attention and
            creative excellence. Whether it’s a wedding, festival, or a personal
            photoshoot, we strive to make your experience memorable.
          </p>
          <p>Thank you for trusting us to be a part of your story!</p>
        </div>
      </div>

      {/* WHY US SECTION */}

      <div ref={whyUsRef} className="serviceSection">
        <h2 className="beautiful-title">Why Us</h2>
        <div className="whyUsBoxes">
          {/* Box 1 */}
          <div className="whyUsBox">
            <div className="iconCircle" style={{ background: "#b388ff" }}>
              <FaUserTie size={32} color="#fff" />
            </div>
            <div className="whyUsTitle">Experienced Professionals</div>
            <div className="whyUsDesc">
              Our team brings years of expertise in photography and mehndi
              artistry.
            </div>
          </div>
          {/* Box 2 */}
          <div className="whyUsBox">
            <div className="iconCircle" style={{ background: "#ff8a65" }}>
              <FaHeart size={32} color="#fff" />
            </div>
            <div className="whyUsTitle">Personalized Service</div>
            <div className="whyUsDesc">
              We tailor every experience to your unique needs and preferences.
            </div>
          </div>
          {/* Box 3 */}
          <div className="whyUsBox">
            <div className="iconCircle" style={{ background: "#4dd0e1" }}>
              <FaStar size={32} color="#fff" />
            </div>
            <div className="whyUsTitle">Quality & Creativity</div>
            <div className="whyUsDesc">
              We deliver creative, high-quality results that stand out.
            </div>
          </div>
          {/* Box 4 */}
          <div className="whyUsBox">
            <div className="iconCircle" style={{ background: "#aed581" }}>
              <FaSmile size={32} color="#fff" />
            </div>
            <div className="whyUsTitle">Customer Satisfaction</div>
            <div className="whyUsDesc">
              Your happiness is our top priority. We strive to exceed your
              expectations.
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT US SECTION */}
      <div ref={contactRef} className="contactUsSection">
        <h2 className="beautiful-title">Contact Us</h2>
        <div className="contactUsGrid">
          {/* Office Address */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#b388ff" }}
            >
              <FaMapMarkerAlt size={28} color="#fff" />
            </div>
            <h3>Our Office Address</h3>
            <p>
              123 Main Street,
              <br />
              City Name, State, 123456
              <br />
              India
            </p>
          </div>
          {/* General Enquiries */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#ff8a65" }}
            >
              <FaEnvelope size={28} color="#fff" />
            </div>
            <h3>General Enquiries</h3>
            <p>
              Email: <a href="mailto:info@example.com">info@example.com</a>
            </p>
          </div>
          {/* Call Us */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#4dd0e1" }}
            >
              <FaPhoneAlt size={28} color="#fff" />
            </div>
            <h3>Call Us</h3>
            <p>
              +91 98765 43210
              <br />
              +91 91234 56789
            </p>
          </div>
          {/* Our Timing */}
          <div className="contactUsItem">
            <div
              className="contactIconCircle"
              style={{ background: "#aed581" }}
            >
              <FaClock size={28} color="#fff" />
            </div>
            <h3>Our Timing</h3>
            <p>
              Mon - Sat: 10:00 AM - 8:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="inquiry-form-container">
          <form className="inquiry-form" onSubmit={handleSubmit}>
            {/* Row of first three inputs */}
            <div className="row-inputs">
              <div className="form-group">
                {/* <label htmlFor="fullName">Full Name</label> */}
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="email">Email ID</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="mobile">Mobile Number</label> */}
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Message textarea spanning full width */}
            <div className="form-group full-width">
              {/* <label htmlFor="message">Message</label> */}
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit button centered */}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ maxWidth: "1200px", width: "100%", padding: "0 20px" }}>
            <iframe
              title="Our Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7334.832259809936!2d72.62934854395691!3d23.19150072813008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2a39c9afec9d%3A0xc7a70a342c2395fb!2sInfocity%2C%20Gandhinagar%2C%20Gujarat%20382421!5e0!3m2!1sen!2sin!4v1753961419312!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
