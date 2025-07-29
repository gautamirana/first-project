import React from 'react';
import '../styles/Videos.css';

const videoList = [
  {
    id: 1,
    title: 'Bridal Mehndi Tutorial',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', // Replace with your video URLs or local files
    thumbnail: require('../assets/images/Service_img1.jpeg'),
  },
  {
    id: 2,
    title: 'Party Mehndi Design',
    src: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail: require('../assets/images/Service_img1.jpeg'),
  },
];

function Videos() {
  return (
    <div className="videos-section">
      <h2 className="videos-title">Our Video Gallery</h2>
      <div className="videos-grid">
        {videoList.map(video => (
          <div className="video-card" key={video.id}>
            <video width="320" height="180" controls poster={video.thumbnail}>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;