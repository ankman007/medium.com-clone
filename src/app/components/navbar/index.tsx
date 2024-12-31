'use client'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Button from "../button";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Logo</h1>

            <div className={`${styles.navItems} ${isMobileMenuOpen ? styles.mobileNav : ''}`}>
                <ul className={styles.menu}>
                    <li><a href="">Home</a></li>
                    <li><a href="/popular">Popular</a></li>
                    <li><a href="/trending">Trending</a></li>
                </ul>

                <div className={styles.buttonGroup}>
                    <Button text="Log in" variant="primary" />
                    <Button text="Get Started" variant="secondary" />
                </div>
            </div>

            <button className={styles.hamburger} onClick={handleMenuToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <hr className={styles.separator} />
        </header>
    );
}
