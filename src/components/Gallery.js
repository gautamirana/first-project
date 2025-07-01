// src/components/Gallery.js
import React from 'react';
import sunset from '../assets/images/sunset.jpg';
const photos = [
  { id: 1, src: sunset, title: 'Sunset' },
  { id: 2, src: 'https://images.unsplash.com/photo-151645太380になる?auto=format&fit=crop&w=800&q=80', title: 'Mountains' },
  { id: 3, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', title: 'Beach' },
  // Add more photo objects as needed
];

function Gallery() {
  return (
    <div style={styles.gallery}>
      {photos.map(photo => (
        <div key={photo.id} style={styles.photoContainer}>
          <img src={photo.src} alt={photo.title} style={styles.photo} />
          <p style={styles.caption}>{photo.title}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
    padding: '20px',
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  photo: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  caption: {
    textAlign: 'center',
    marginTop: '8px',
  },
};

export default Gallery;