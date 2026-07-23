import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>ClienteObra</h2>
          <p>Gerencie seus clientes com eficiência e controle.</p>
        </div>

        <div className="footer-links">

          <div>
            <h3>Contato</h3>
            <p>Email: clienteobrasupport@gmail.com</p>
            <p>Instagram: @henriquegbossle</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-left">
          <span>ClienteObra © {new Date().getFullYear()} Todos os direitos reservados.</span>
        </div>

        <div className="footer-right">
          <span className="dev-credit">Desenvolvido por Henrique Gonçalves Bossle.</span>

          <div className="social-links">
            <a
              href="https://www.instagram.com/henriquegbossle/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a
              href="https://www.linkedin.com/in/henrique-bossle-219b622b9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>
           

    </footer>
  )
}

export default Footer
