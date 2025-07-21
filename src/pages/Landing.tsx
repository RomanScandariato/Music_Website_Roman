import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Landing() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleButtonClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      });
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Optional: keep button in sync if user pauses/plays audio via browser controls
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <Container fluid={true}>
      <div className="play-btn-top-left ">
        <button
          onClick={handleButtonClick}
          className="btn initial-load mt-3"
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '18px',
            letterSpacing: '1.5px',
            textShadow: 'rgba(179, 217, 255, 0.6) 0px 0px 10px, rgba(179, 217, 255, 0.3) 0px 0px 20px',
            filter: 'blur(0.75px)',
            textTransform: 'uppercase'
          }}
        >
          {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
        </button>
      </div>
      <Row>
        <Col xs="12" className="p-0">
          <div className="video-wrapper">
            <video className="landing-hero-video" autoPlay loop muted>
              <source src="/videos/landing-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <audio ref={audioRef} src="/audio/landing-song.mp3" loop />
          </div>
        </Col>
        <div className="rec-date-time-container">
          <div
            className="vcr-font text-red-600 mb-1 text-lg md:text-xl"
            style={{
              color: 'rgb(255, 0, 0)',
              textShadow: 'rgba(255, 0, 0, 0.8) 0px 0px 10px, rgba(255, 0, 0, 0.4) 0px 0px 20px'
            }}
          >
            ● REC
          </div>
          <div className="vcr-font mb-1 md:text-lg" style={{ color: 'rgb(179, 217, 255)' }}>
            {date}
          </div>
          <div className="vcr-font md:text-lg" style={{ color: 'rgb(179, 217, 255)' }}>
            {time}
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Landing;