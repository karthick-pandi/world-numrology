import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaInfoCircle, FaSignOutAlt, FaCog, FaBell, FaChevronDown, FaAndroid, FaApple } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [appDropdown, setAppDropdown] = useState(false);
    const appRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (appRef.current && !appRef.current.contains(event.target as Node)) {
                setAppDropdown(false);
            }
        }
        if (appDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [appDropdown]);

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarRoot}>
                <div className={styles.menuGroup}>
                    {/* GET THE APP Dropdown */}
                    <div
                        ref={appRef}
                        className={styles.dropdownWrapper}
                    >
                        <div
                            className={`${styles.menuItem} ${appDropdown ? styles.menuItemActive : ""}`}
                            onClick={() => setAppDropdown((v) => !v)}
                        >
                            GET THE APP <FaChevronDown size={12} />
                        </div>
                        {appDropdown && (
                            <div className={styles.dropdownMenu}>
                                <div className={styles.dropdownItem}>
                                    <FaAndroid color="#43c97f" size={20} /> Android <FaChevronDown size={12} style={{ marginLeft: "auto", color: "#bbb" }} />
                                </div>
                                <div className={styles.dropdownItem}>
                                    <MdPhoneIphone color="#ff9800" size={20} /> iPhone <FaChevronDown size={12} style={{ marginLeft: "auto", color: "#bbb" }} />
                                </div>
                                <div className={styles.dropdownItem}>
                                    <FaApple color="#e74c3c" size={20} /> Mac
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Other menu items */}
                    <div className={styles.menuItem}>
                        KARTHICK <FaChevronDown size={12} />
                    </div>
                    <Link href="#" className={styles.link}>ACCOUNT/USERS</Link>
                    <Link href="#" className={styles.link}>UPGRADE</Link>
                    <FaInfoCircle size={20} style={{ cursor: "pointer" }} />
                    <FaSignOutAlt size={20} style={{ cursor: "pointer" }} />
                    <FaCog size={20} style={{ cursor: "pointer" }} />
                    <div className={styles.bellWrapper}>
                        <FaBell size={20} style={{ cursor: "pointer" }} />
                        <span className={styles.bellBadge}>0</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;