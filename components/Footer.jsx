// components/Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bubble">
        <div className="titleandcr">
          <h1>¿Hablamos?</h1>
          <p>© Sicilia López Molero 2026</p>
        </div>

        <ul className="cta-rrss">
          <li>
            <a href="https://linkedin.com">
              <FontAwesomeIcon icon={faLinkedin} />
              <p>LinkedIn</p>
            </a>
          </li>
          <li>
            <a href="mailto:dormirydibujar@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>dormirydibujar@gmail.com</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
