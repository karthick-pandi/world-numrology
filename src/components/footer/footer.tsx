import React from "react";
import { FaFacebookF, FaPinterestP, FaYoutube, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const footerLogo = '/images/w_n_logo.webp';
const Footer: React.FC = () => {

  return (
    <footer
      className="text-white pt-5"
    >
      <div className="container">

        {/* Top Section */}
        <div className="row gy-4 align-items-start">

          {/* Logo */}
          <div className="col-md-3">
            <div className="ft-logo">
              <span>
                <Image src={footerLogo} alt="logo" width={280} height={40} />
              </span>
            </div>
          </div>

          {/* Insights */}
          <div className="col-md-2">
            <h6 className="mb-3">Insights</h6>
            <ul className="list-unstyled">
              <li><a href="https://www.worldnumerology.com/numerology-life-path/" target="_blank">Life Path</a></li>
              <li><a href="https://www.worldnumerology.com/numerology-soul-urge/" target="_blank">Soul Urge</a></li>
              <li><a href="https://www.worldnumerology.com/free-forecasts/daily-number-forecast/" target="_blank">Daily Forecast</a></li>
              <li><a href="https://www.worldnumerology.com/free-forecasts/monthly-numerology-forecast.html" target="_blank">Monthly Forecast</a></li>
              <li><a href="https://www.worldnumerology.com/personal-numerology-forecast/" target="_blank">Yearly Forecast</a></li>
              <li><a href="https://www.worldnumerology.com/numerology-chart-calculator/" target="_blank">Numerology Chart</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="col-md-3">
            <h6 className="mb-3">My Account</h6>
            <ul className="list-unstyled">
              <li><a href="#" target="_blank">Home</a></li>
              <li><a href="https://www.worldnumerology.com/professional-services/" target="_blank">Online-Professional Login</a></li>
            </ul>
          </div>

          {/* About */}
          <div className="col-md-2">
            <h6 className="mb-3">About</h6>
            <ul className="list-unstyled">
              <li><a href="https://www.worldnumerology.com/about-us/index.html" target="_blank">Hans Decoz</a></li>
              <li><a href="https://www.worldnumerology.com/about-us/our-story.html" target="_blank">Our Story</a></li>
              <li><a href="https://www.worldnumerology.com/about-us/partnerships-and-acquisition.html" target="_blank">Partner With Us</a></li>
              <li><a href="https://www.worldnumerology.com/contact-us/index.php" target="_blank">Contact</a></li>
              <li><a href="https://www.worldnumerology.com/numerology-resources-and-tools/" target="_blank">Resources & Tools</a></li>
            </ul>
          </div>

          {/* Follow */}
          <div className="col-md-2 social-media">
            <h6 className=" mb-3">Follow</h6>
            <div className="d-flex gap-2">
              <a href="https://www.facebook.com/worldnumerology/" className="s-btns rounded-circle">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.pinterest.com/worldnumerology/" className="s-btns rounded-circle">
                <FaPinterestP size={16} />
              </a>
              <a href="https://www.youtube.com/@worldnumerology" className="s-btns rounded-circle">
                <FaYoutube size={16} />
              </a>
              <a href="https://www.instagram.com/worldnumerology/" className="s-btns rounded-circle">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-light opacity-25 my-4" />

        {/* Bottom Content */}
        <div className="text-center pb-4 ft-bt">
          <p className="mb-1">
            1900 W. Gray Street, #130922, Houston, Texas 77219 |
            713.438.3940 | <a href="https://www.worldnumerology.com/contact-us/index.php" target="_blank">Contact us</a>
          </p>

          <p className="mb-1">
            World Numerology® holds the exclusive license to Decoz® numerology
            software and online readings and charts.
          </p>

          <p className="mb-1">
            ©2026 Hans Decoz and World Numerology. All Rights Reserved.
          </p>

          <p className="mb-0">
            <a href="https://www.worldnumerology.com/sitemap.xml">Sitemap</a> | <a href="https://www.worldnumerology.com/privacy-policy.html">Privacy Policy</a> | <a href="https://www.worldnumerology.com/EULA.html">EULA</a> | <a href="https://www.worldnumerology.com/website-accessibility.html">Website Accessibility</a> |
            Website Design by <a href="https://designatwork.com/">Design At Work</a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
