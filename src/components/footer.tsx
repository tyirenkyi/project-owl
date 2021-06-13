import { Link } from "react-router-dom";

import "../assets/css/footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <Link to='/'>
        <h2>Project OWL</h2>
      </Link>
      <div className="footer-links">
        <Link to='/'>
          <p>Home</p>
        </Link>
        <p>About</p>
        <a href='https://github.com/tyirenkyi/project-owl' target="_blank" rel="noreferrer">
          <p>GitHub</p>
        </a>
      </div>
    </div>
  )
}

export default Footer;