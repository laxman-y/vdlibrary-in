// src/components/Footer.js
import React from "react";
import "../style.css"; // make sure you have your styles or use inline/CSS modules

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
  <img src="/logo11.png" alt="VDL Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
  <h1 style={{ margin: 0 }}>Vinayak Digital Library</h1>
</div>
          <p>Empowering students with smart education tools.</p>
          <p>Address: Karhan-Mau, UP (276402)</p>
          <p><strong><i>FOR ANY QUERIES REACH OUT TO US :</i></strong></p>
          <p>Contact: <a href="mailto:shashi.mau62@gmail.com">shashi.mau62@gmail.com</a></p>
          <p>Phone: +91-9415883700</p>
        </div>
        <div>
          <h4>Developed By</h4>
             <p>Laxman Yadav</p>
          <p><strong><i>FOR ANY TECH RELATED QUERIES GET IN TOUCH WITH :</i></strong></p>
          <p>Contact: <a href="mailto:laxmanyadav89357@gmail.com">laxmanyadav89357@gmail.com</a></p>
          <p>Telegram: <a href="https://t.me/laxmanyadav10">laxmanyadav10</a></p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a href="#" className="social-link">Facebook</a> |{" "}
          <a href="#" className="social-link">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Vinayak Digital Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
