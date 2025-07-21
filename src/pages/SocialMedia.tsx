import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Socials() {
  return (
    <div>
      <h1 className="text-center my-4">Social Media</h1>
      <div className="social-container d-flex justify-content-center align-items-start">
        <div className="social-items">
            <div className="social-item d-flex align-items-center mb-5 me-5 mt-5">
            <a
              href="https://open.spotify.com/artist/3QKzy5QsFJh68sQdD7lm0c"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              aria-label="Spotify"
            >
              <FontAwesomeIcon icon={faSpotify} size="lg" style={{ fontSize: '75px', color: '#1DB954' }} />
            </a>
            <p className="styled-paragraph">Full Versions of Several Songs Available for Streaming</p>
          </div>
          <div className="social-item d-flex align-items-center mb-5">
            <a
              href="https://www.instagram.com/maypodeluxe/"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" style={{ fontSize: '90px', color: '#E1306C' }} />
            </a>
            <p className="styled-paragraph">Music Video Clips of Recently Released Songs</p>
          </div>
          <div className="social-item d-flex align-items-center mb-5">
            <a
              href="https://www.youtube.com/@maypodeluxe5463"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              aria-label="Youtube"
            >
              <FontAwesomeIcon icon={faYoutube} size="lg" style={{ fontSize: '74px', color: '#FF0032' }} />
            </a>
            <p className="styled-paragraph">Youtube Video Clips of Recently Released Songs</p>
          </div>
          <div className="social-item d-flex align-items-center mb-5">
            <a
              href="https://www.tiktok.com/@maypodeluxe"
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
              aria-label="TikTok"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" style={{ fontSize: '90px', color: '#24F3EE' }} />
            </a>
            <p className="styled-paragraph">Maypo Doing Acoustic Covers and Originals</p>
          </div>
        </div>
        <img src="images/socials_img.png" alt="cool image of Maypo" className="social-image ms-4" />
      </div>
    </div>
  );
}

export default Socials;