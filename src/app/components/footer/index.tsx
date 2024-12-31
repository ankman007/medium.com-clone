import InputBox from "../inputBox";
import Button from "../button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css'; 

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>Logo</h1>
                    <p className={styles.newsletterText}>Join our newsletter to stay up to date on features and releases.</p>
                    <div className={styles.subscription}>
                        <div className="mb-2">
                            <InputBox placeholder="Enter your email" variant="secondary" />
                        </div>
                        <Button text="Subscribe" variant="secondary" />
                    </div>
                    <p className={styles.privacyText}>
                        By subscribing, you agree to our <a href="/privacy-policy">Privacy Policy</a> and provide consent to receive updates from our company.
                    </p>
                </div>

                <div className={styles.linkSection}>
                    <h3 className={styles.linkTitle}>About Us</h3>
                    <ul className={styles.footerLinks}>
                        <li><a href="/popular">Popular</a></li>
                        <li><a href="/trending">Trending</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/support">Support/Help</a></li>
                        <li><a href="/request-topics">Request Topics</a></li>
                    </ul>
                </div>

                <div className={styles.linkSection}>
                    <h3 className={styles.linkTitle}>Others</h3>
                    <ul className={styles.footerLinks}>
                        <li><a href="/faqs">FAQs</a></li>
                        <li><a href="/terms-and-conditions">Terms and Conditions</a></li>
                        <li><a href="/support">Support</a></li>
                        <li><a href="/link-nine">Link Nine</a></li>
                        <li><a href="/link-ten">Link Ten</a></li>
                    </ul>
                </div>

                <div className={styles.socialSection}>
                    <h3 className={styles.linkTitle}>Follow Us</h3>
                    <ul className={styles.socialIcons}>
                        <li>
                            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} className={styles.faIcon} />
                                <p>Facebook</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                
                            <FontAwesomeIcon icon={faInstagram} className={styles.faIcon}/>
                            <p>Instagram</p>

                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className={styles.faIcon}/>
                                <p>Twitter</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className={styles.faIcon}/>
                                <p>Linkedln</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.bottomSection}>
                <p>&copy; 2024 ankman007. All rights reserved.</p>
                <ul className={styles.policyLinks}>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/terms-of-service">Terms of Service</a></li>
                    <li><a href="/cookies-settings">Cookies Settings</a></li>
                </ul>
            </div>
        </footer>
    );
}
