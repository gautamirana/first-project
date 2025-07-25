import React from 'react';
import { useParams } from 'react-router-dom';
// import '../styles/GalleryDetail.css';

const galleryDetails = {
  1: {
    title: 'Bridal Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  2: {
    title: 'Party Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  3: {
    title: 'Kids Mehndi',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
  4: {
    title: 'Traditional Art',
    images: [
      require('../assets/images/Service_img1.jpeg'),
      require('../assets/images/Service_img1.jpeg'),
    ],
  },
};

function GalleryDetail() {
  const { id } = useParams();
  const detail = galleryDetails[id];

  if (!detail) return <div>Gallery not found</div>;

  return (
    <div className="serviceSection">
      <h2>{detail.title}</h2>
      <div className="imagesContainer">
        {detail.images.map((img, idx) => (
          <div className="imageCard" key={idx}>
            <img src={img} alt={detail.title} className="serviceImage" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryDetail;