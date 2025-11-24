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

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid,
  Box,
  Image,
  Text,
  Heading,
  // UnorderedList,
  // ListItem,
} from "@chakra-ui/react";

function Header({ speed = 15 }) {
  // Chakra modal control for categories
  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  // Terms & Conditions modal control
  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose,
  } = useDisclosure();

  // categories data (replace images if you add new assets)
  const categories = [
    { title: "Bridal Mehndi", img: serviceimg1 },
    { title: "Party Mehndi", img: serviceimg1 },
    { title: "Kids Mehndi", img: serviceimg1 },
    { title: "Heena Body Tattoos", img: serviceimg1 },
  ];

  // for data save in inquiry form
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
  // for data save in inquiry form

  const images = [bgImage, bgImage1, bgImage2, bgImage3];
  const [panels, setPanels] = useState(
    images.map((img, i) => ({ img, key: i }))
  );
  const [lefts, setLefts] = useState(
    images.map((_, i) => i * window.innerWidth)
  );
  const intervalRef = useRef();

  // Create ref for the Service section
  const serviceRef = useRef(null);
  const aboutRef = useRef(null);
  const whyUsRef = useRef(null);
  const contactRef = useRef(null);
  const useFullLinkRef = useRef(null);
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

  // const handleScrollToLinks = () => {
  //   if (useFullLinkRef.current) {
  //     useFullLinkRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

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

  // 1) Reviews data (you can replace with real data later)
  const reviews = [
    {
      name: "Alicia R.",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely stunning work! The Henna design lasted over a week and drew compliments everywhere I went.",
      avatarColor: "#f06292",
    },
    {
      name: "Mehul K.",
      location: "Mumbai, India",
      rating: 4,
      text: "Professional and friendly. The artist explained the process clearly and made me feel comfortable.",
      avatarColor: "#64b5f6",
    },
    {
      name: "Sara L.",
      location: "Dubai, UAE",
      rating: 5,
      text: "Loved the creativity and precision. The gallery of samples helped me choose the perfect design.",
      avatarColor: "#ffd54f",
    },
    {
      name: "Sara L.",
      location: "Dubai, UAE",
      rating: 5,
      text: "Loved the creativity and precision. The gallery of samples helped me choose the perfect design.",
      avatarColor: "#ffd54f",
    },
  ];

  // 2) Internal state for the reviews carousel
  const [currentReview, setCurrentReview] = useState(0);
  const reviewCount = reviews.length;
  const reviewInterval = useRef(null);

  // 3) Auto-rotate reviews (every 5 seconds)
  useEffect(() => {
    reviewInterval.current = setInterval(() => {
      setCurrentReview((i) => (i + 1) % reviewCount);
    }, 5000);
    return () => clearInterval(reviewInterval.current);
  }, [reviewCount]);

  // 4) Handlers for manual navigation (buttons or swipe)
  const goToReview = (idx) => {
    setCurrentReview(((idx % reviewCount) + reviewCount) % reviewCount);
  };

  const handleDragStart = (e) => {
    // store start X
    e.target._dragX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e) => {
    const startX = e.target._dragX;
    if (startX == null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - startX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        // swipe left -> next
        setCurrentReview((i) => (i + 1) % reviewCount);
      } else {
        // swipe right -> previous
        setCurrentReview((i) => (i - 1 + reviewCount) % reviewCount);
      }
    }
    e.target._dragX = null;
  };

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
          <button type="button" className="tab" onClick={handleScrollToWhyUs}>
            {" "}
            Why Us{" "}
          </button>
          <button type="button" className="tab" onClick={handleScrollToContact}>
            Contact Us{" "}
          </button>
          <a href="/gallery" className="tab" target="_self">
            Gallery
          </a>
          <a href="/videos" className="tab" target="_self">
            Videos
          </a>{" "}
          <a href="/inquiry" className="tab" target="_self">
            Inquiry Form
          </a>
          {/* <-- Add this line */}
        </div>
      </div>
      {/* SERVICE SECTION */}
      <div id="service" ref={serviceRef} className="serviceSection">
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
      <div id="about" ref={aboutRef} className="serviceSection">
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
      {/* Customer Reviews SECTION */}
      <div className="reviewsSection">
        <h2 className="beautiful-title">What Our Customers Say</h2>

        <div
          className="reviewsCarousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {reviews.map((r, idx) => {
            // compute relative position
            const diff = idx - currentReview;
            // wrap around for silent animation
            const offset = diff === 0 ? 0 : diff > 0 ? 1 : -1;
            const transform = `translateX(${offset * 110}%) rotateY(${
              offset * -8
            }deg) scale(${idx === currentReview ? 1 : 0.92})`;
            const zIndex = idx === currentReview ? 3 : 2;
            return (
              <div
                key={idx}
                className="reviewCard"
                style={{
                  transform,
                  zIndex,
                }}
              >
                <div className="avatar" style={{ background: r.avatarColor }}>
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="reviewContent">
                  <div className="reviewHeader">
                    <strong className="reviewName">{r.name}</strong>
                    <span
                      className="reviewLocation"
                      aria-label={`Location ${r.location}`}
                    >
                      {r.location}
                    </span>
                  </div>
                  <div className="stars" aria-label={`${r.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < r.rating ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="reviewText">"{r.text}"</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reviewsNav" aria-label="Review navigation">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentReview ? "active" : ""}`}
              onClick={() => goToReview(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Customer Reviews SECTION */}
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

      {/* Usefull Links SECTION */}
      <div ref={useFullLinkRef} className="contactUsSection">
        <h2 className="beautiful-title">Useful Links</h2>
        <div className="useful-links-grid four-columns">
          <div className="links-group">
            <h4>Policies & More</h4>
            <ul>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onCatOpen();
                  }}
                >
                  Categories
                </a>
              </li>
              <li>
                <a href="/videos">Videos</a>
              </li>

              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onTermsOpen();
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div className="links-group">
            <h4>Navigate</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a
                  href="#service"
                  onClick={(e) => {
                    e.preventDefault();
                    serviceRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Service
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    aboutRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    whyUsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Why Us
                </a>
              </li>
              {/* <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    contactRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Contact Us
                </a>
              </li> */}

              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/testimonials">Testimonials</a>
              </li>
            </ul>
          </div>
          <div className="links-group">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li>Address : 123 Main St, Anytown, USA</li>
              <li>Phone : +91 9054344963</li>
              <li>
                <a href="mailto:giftarticle00@gmail.com">
                  Email : giftarticle00@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="links-group">
            <h4>Follow Us</h4>
            <ul className="social-list">
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
            </ul>
          </div>
        </div>
      </div>

      {/* Categories Modal */}
      <Modal
        isOpen={isCatOpen}
        onClose={onCatClose}
        size="xl"
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay
          bg="rgba(129, 134, 158, 0.6)"
          backdropFilter="blur(6px)"
        />
        <ModalContent
          borderRadius="xl"
          overflow="hidden"
          maxW="900px"
          bgGradient="linear(to-b, rgba(228, 197, 212, 0.95), rgba(184, 115, 151, 0.95))"
          color="white"
          boxShadow="0 12px 40px rgba(173, 98, 144, 0.6)"
          border="1px solid rgba(255,255,255,0.04)"
        >
          <ModalHeader
            textAlign="center"
            fontSize="3xl"
            className="beautiful-title"
          >
            <Box as="span" display="block" fontWeight="800">
              Mehndi Categories
            </Box>
          </ModalHeader>

          <ModalCloseButton color="whiteAlpha.800" />
          <ModalBody pb={6}>
            <SimpleGrid columns={[1, 2, 4]} spacing={6}>
              {categories.map((c, idx) => (
                <Box
                  key={idx}
                  as="button"
                  onClick={() => {
                    /* optional: handle category click */
                  }}
                  borderRadius="md"
                  borderWidth={"2px"}
                  borderColor="blackAlpha.200"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="transform 200ms ease, box-shadow 200ms ease"
                  _hover={{ transform: "translateY(-6px)", boxShadow: "lg" }}
                  display="flex"
                  flexDirection="column"
                  bg="whiteAlpha.50"
                >
                  <Image
                    src={c.img}
                    alt={c.title}
                    objectFit="cover"
                    width="100%"
                    height="140px"
                    style={{ display: "block" }}
                    fallbackSrc={serviceimg1}
                  />

                  {/* Text container below image */}
                  <Box px={3} py={3} bg="transparent" color="black">
                    <Text fontWeight="700" fontSize="md" letterSpacing="tight">
                      {c.title}
                    </Text>
                    <Text fontSize="sm" opacity={0.9} mt={1} color="black">
                      {c.description ||
                        "Beautiful mehndi designs for every occasion"}
                    </Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button
              bgGradient="linear(to-r, teal.400, green.400)"
              color="white"
              onClick={onCatClose}
            >
              View All Categories
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Terms & Conditions Modal */}
      <Modal isOpen={isTermsOpen} onClose={onTermsClose} size="lg" isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(3px)" />
        <ModalContent borderRadius="lg" maxW="800px" overflow="hidden">
          <ModalHeader textAlign="center">
            <Heading size="md">Terms & Conditions</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={3}>
              <Text fontWeight="700">1. Acceptance</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                By using our website or booking services you agree to these
                terms.
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">2. Services & Bookings</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                We provide mehndi and photography services. Bookings are
                confirmed once payment or deposit is received (as specified at
                booking).
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">3. Payments & Refunds</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Payment methods and refund/cancellation rules are shown at time
                of booking. Refunds, if any, are at our discretion and may be
                subject to fees.
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">4. Cancellations & Rescheduling</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Please notify us as soon as possible to cancel or reschedule.
                Cancellation fees may apply for short-notice changes.
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">5. Liability</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                We take care to provide quality services. We are not liable for
                indirect or consequential losses. Our maximum liability is the
                amount paid for the service.
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">6. Intellectual Property</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                Images, designs and content on this site are owned by us or our
                partners. Do not reproduce without permission.
              </Text>
            </Box>

            <Box mb={3}>
              <Text fontWeight="700">7. Privacy</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                We collect and use personal data to provide services. See our
                Privacy Policy for details.
              </Text>
            </Box>

            <Box mb={1}>
              <Text fontWeight="700">8. Governing Law</Text>
              <Text fontSize="sm" color="gray.600" mt={1}>
                These terms are governed by the laws of the jurisdiction where
                the business operates.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onTermsClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={onTermsClose}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* END Terms Modal */}
    </>
  );
}

export default Header;
