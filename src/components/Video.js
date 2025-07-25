import React from 'react';

function Video() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Our Videos</h2>
      <p>Welcome to our video gallery! Here you can watch our latest work and behind-the-scenes footage.</p>
      {/* Add your video embeds or video list here */}
      <div>
        {/* Example YouTube embed */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Sample Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Video;