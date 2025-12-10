import React from "react";
import styles from "../css/Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          
          {/* About */}
          <div className={`${styles.footerSection} ${styles.footerAbout}`}>
            <div className={styles.logoContainer}>
              <h3 className={styles.logo}>Movie<span>DB</span></h3>
            </div>
            <p>
              MovieDB is your ultimate destination for discovering movies, TV
              shows, and actors. We provide the latest information about your
              favorite entertainment content.
            </p>
            <div className={styles.footerSocial}>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${styles.footerSection} ${styles.footerLinks}`}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Popular Movies</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Top Rated</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Now Playing</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Upcoming</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> TV Shows</a></li>
            </ul>
          </div>

          {/* Browse By */}
          <div className={`${styles.footerSection} ${styles.footerLinks}`}>
            <h3>Browse By</h3>
            <ul>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Genres</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Years</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Countries</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Actors</a></li>
              <li><a href="#"><FaChevronRight className={styles.chevron} /> Directors</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={`${styles.footerSection} ${styles.footerSubscribe}`}>
            <h3>Stay Updated</h3>
            <p>Subscribe to get updates on latest movies and TV shows</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomContent}>
            <p>&copy; 2025 MovieDB. All rights reserved.</p>
            {/* <div className={styles.tmdbAttribution}>
              <p>Powered by</p>
              <div className={styles.tmdbLogo}>
                <span>TMDB API</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
