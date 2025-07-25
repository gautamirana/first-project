import React , { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Gallery.css';

const galleryImages = [
  { id: 1, src: require('../assets/images/Service_img1.jpeg'), title: 'Bridal Mehndi' },
  { id: 2, src: require('../assets/images/Service_img1.jpeg'), title: 'Party Mehndi' },
  { id: 3, src: require('../assets/images/Service_img1.jpeg'), title: 'Kids Mehndi' },
  { id: 4, src: require('../assets/images/Service_img1.jpeg'), title: 'Traditional Art' },
];

function Gallery() {
  const navigate = useNavigate();

   // Redirect to home if loaded directly (on reload)
  useEffect(() => {
    if (window.location.pathname === '/gallery') {
      if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
        navigate('/', { replace: true });
      }
    }
  }, [navigate]);

  const handleImageClick = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className="gallery-section">
      <h2 className="gallery-title">Our Creative Gallery</h2>
      <div className="gallery-grid">
        {galleryImages.map(img => (
          <div className="gallery-card" key={img.id} onClick={() => handleImageClick(img.id)} tabIndex={0}
            role="button"
            aria-label={img.title}
          >
            <img src={img.src} alt={img.title} className="gallery-image" />
            <div className="gallery-overlay">
              <span className="gallery-img-title">{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;