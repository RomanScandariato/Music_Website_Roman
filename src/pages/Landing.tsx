import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Landing() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('/audio/landing-song-one.mp3');

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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 15
        }}
      >
        <h1
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '7vw',
            letterSpacing: '2vw',
            textShadow: `
          0 0 16px rgba(179,217,255,0.8),
          0 0 32px rgba(179,217,255,0.6),
          0 0 64px rgba(179,217,255,0.4)
        `,
            textTransform: 'uppercase',
            filter: 'blur(0.5px)',
            margin: 0,
            textAlign: 'center',
            userSelect: 'none'
          }}
        >
          BOOYAH!!
        </h1>
      </div>
      <div
        className="top-right-btns"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          margin: 0,
          padding: '12px'
        }}
      >
        <button
          className="btn initial-load"
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '18px',
            letterSpacing: '1.5px',
            textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgb(179, 217, 255)'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-one.mp3');
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
              }
            }, 0);
          }}
        >
          One
        </button>
        <button
          className="btn initial-load"
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '18px',
            letterSpacing: '1.5px',
            textShadow: `
              0 0 8px rgba(179,217,255,0.8),
              0 0 16px rgba(179,217,255,0.6),
              0 0 32px rgba(179,217,255,0.4)
            `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgb(179, 217, 255)'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-two.mp3');
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
              }
            }, 0);
          }}
        >
          Two
        </button>
        <button
          className="btn initial-load"
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '18px',
            letterSpacing: '1.5px',
            textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgb(179, 217, 255)'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-three.mp3');
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
              }
            }, 0);
          }}
        >
          Three
        </button>
      </div>
      <div className="play-btn-top-left ">
        <button
          onClick={handleButtonClick}
          className="btn initial-load mt-3"
          style={{
            fontFamily: 'VCR, monospace',
            color: 'rgb(179, 217, 255)',
            fontSize: '18px',
            letterSpacing: '1.5px',
            textShadow: `
        0 0 8px rgba(179,217,255,0.8),
        0 0 16px rgba(179,217,255,0.6),
        0 0 32px rgba(179,217,255,0.4)
      `,
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
            <audio ref={audioRef} src={audioSrc} loop />
          </div>
        </Col>
        <div className="rec-date-time-container" style={{ paddingLeft: '25px' }}>
          <div
            className="text-red-600 mb-1 text-lg md:text-xl vcr-font"
            style={{
              fontFamily: 'VCR, monospace',
              color: 'rgb(255, 0, 0)',
              filter: 'blur(1px)',
              textShadow: `
        0 0 8px rgba(255,0,0,0.8),
        0 0 16px rgba(255,0,0,0.6),
        0 0 32px rgba(255,0,0,0.4)
      `
            }}
          >
            ● REC
          </div>
          <div
            className="vcr-font mb-1 md:text-lg"
            style={{
              fontFamily: 'VCR, monospace',
              color: 'rgb(222, 236, 250)',
              filter: 'blur(1px)',
              textShadow: `
        0 0 8px rgba(179,217,255,0.8),
        0 0 16px rgba(179,217,255,0.6),
        0 0 32px rgba(179,217,255,0.4)
      `
            }}
          >
            {date}
          </div>
          <div
            className="vcr-font md:text-lg"
            style={{
              fontFamily: 'VCR, monospace',
              color: 'rgb(222, 236, 250)',
              filter: 'blur(1px)',
              textShadow: `
        0 0 8px rgba(179,217,255,0.8),
        0 0 16px rgba(179,217,255,0.6),
        0 0 32px rgba(179,217,255,0.4)
      `
            }}
          >
            {time}
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Landing;