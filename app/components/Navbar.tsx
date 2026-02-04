'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import LoginHeaderImage from '@/public/Images/login-header.webp';
import styles from './Navbar.module.css';
import { BsInfoCircle } from 'react-icons/bs'; // Info icon
import { FiLogOut } from 'react-icons/fi'; // Logout icon
import { IoSettingsOutline } from 'react-icons/io5'; // Settings icon
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsInfoCircleFill } from 'react-icons/bs';
import { BsBellFill } from 'react-icons/bs';
const tabs = [
  'READINGS & CHARTS',
  'SINGLE READINGS',
  'SAVED READINGS',
  'SAVED DATA'
];

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('SAVED READINGS');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    if (activeTabElement) {
      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <nav className={styles.navbar}>
      {/* Centered Container with Left-Right Spacing */}
      <div className={styles.navbarContainer}>
        <div className={styles.navbarFlex}>
          {/* LEFT SIDE - Logo */}
          <div className={styles.logoSection}>
            <Image
              src={LoginHeaderImage}
              alt="World Numerology Logo"
            />
          </div>

          {/* RIGHT SIDE - Split into Top & Bottom */}
          <div className={styles.navbarRightSection}>
            {/* TOP - Green Navigation Bar */}
            <div className={styles.greenNav}>
              <div className={styles.navContent}>
                {/* GET THE APP Dropdown */}
                <button className={styles.navButton}>
                  <span>GET THE APP</span>
                  <span className={styles.dropdownIcon}>▼</span>
                </button>

                {/* KARTHICK Dropdown */}
                <button className={styles.navButton}>
                  <span>KARTHICK</span>
                  <span className={styles.dropdownIcon}>▼</span>
                </button>

                {/* ACCOUNT/USERS */}
                <button className={styles.navButton}>
                  ACCOUNT/USERS
                </button>

                {/* UPGRADE */}
                <button className={styles.navButton}>
                  UPGRADE
                </button>

                {/* Icons Section */}
                <div className={styles.iconSection}>
                  {/* Info Icon */}
                  <button className={styles.infoIcon} aria-label="Info">

                    <BsInfoCircleFill size={20} color="white" />
                  </button>

                  {/* Share Icon */}
                  <button className={styles.iconButton} aria-label="Share">
                    <FiLogOut size={20} color="white" />
                  </button>

                  {/* Settings Icon */}
                  <button className={styles.iconButton} aria-label="Settings">
                    <IoSettingsOutline size={20} color="white" />
                  </button>

                  {/* Notification Bell */}
                  <button className={styles.iconButton} aria-label="Notifications">
                    <BsBellFill size={20} color="white" />
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM - Tabs Section */}
            <div className={styles.tabSection}>
              <div className={styles.tabContainer}>
                {/* Desktop Tabs */}
                <div className={styles.desktopTabs}>
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      ref={(el: any) => (tabRefs.current[index] = el)}
                      onClick={() => setActiveTab(tab)}
                      className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : styles.inactiveTab
                        }`}
                    >
                      {tab}
                    </button>

                  ))}

                  {/* Animated Underline */}
                  <div
                    className={styles.underline}
                    style={{
                      left: underlineStyle.left,
                      width: underlineStyle.width,
                    }}
                  />

                  {/* Shopping Cart */}
                  <button className={styles.cartButton} aria-label="Cart">
                    <span className={styles.cartIcon}>🛒</span>
                    <span className={styles.cartBadge}>2</span>
                  </button>
                </div>

                {/* Mobile Tabs */}
                <div className={styles.mobileTabs}>
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${styles.mobileTabButton} ${activeTab === tab ? styles.mobileActiveTab : styles.mobileInactiveTab
                        }`}
                    >
                      {tab}
                      {activeTab === tab && <div className={styles.mobileUnderline} />}
                    </button>
                  ))}

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#5db3ac] border-t border-white/20">
          <div className="max-w-[1400px] mx-auto px-6 py-3 space-y-2">
            <button className="w-full text-left text-white text-sm py-2">GET THE APP</button>
            <button className="w-full text-left text-white text-sm py-2">KARTHICK</button>
            <button className="w-full text-left text-white text-sm py-2">ACCOUNT/USERS</button>
            <button className="w-full text-left text-white text-sm py-2">UPGRADE</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;