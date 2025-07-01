// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} My Heena. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#C792A0',
    // color: '#519755',
    textAlign: 'center',
    padding: '15px',
    // marginTop: '20px',
  },
  title: {
    color: '#fff',
    margin: 0,
  }
};

export default Footer;