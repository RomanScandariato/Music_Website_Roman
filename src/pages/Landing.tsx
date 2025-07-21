import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Landing() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState('/audio/landing-song-one.mp3');
  const [selectedButton, setSelectedButton] = useState('one');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioSrc]);

  const handleSeek = (e: { target: { value: any; }; }) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  };

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

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
            fontSize: '3.5vw',
            letterSpacing: '.4vw',
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
          {selectedButton === 'one' && 'SEE TOMMOROW'}
          {selectedButton === 'two' && 'ALL I NEVER WANTED'}
          {selectedButton === 'three' && 'FLY'}
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
            fontSize: '20px',
            letterSpacing: '1.5px',
            padding: '10px 40px',
            borderRadius: '12px',
            textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: selectedButton === 'one'
              ? '2px solid rgb(179, 217, 255)'
              : '1px solid rgb(179, 217, 255)',
            boxShadow: selectedButton === 'one'
              ? '0 0 16px 4px rgba(179,217,255,0.4)'
              : 'none'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-one.mp3');
            setSelectedButton('one');
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
            fontSize: '20px',
            letterSpacing: '1.5px',
            padding: '10px 40px',
            borderRadius: '12px',
            textShadow: `
              0 0 8px rgba(179,217,255,0.8),
              0 0 16px rgba(179,217,255,0.6),
              0 0 32px rgba(179,217,255,0.4)
            `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: selectedButton === 'two'
              ? '2px solid rgb(179, 217, 255)'
              : '1px solid rgb(179, 217, 255)',
            boxShadow: selectedButton === 'two'
              ? '0 0 16px 4px rgba(179,217,255,0.4)'
              : 'none'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-two.mp3');
            setSelectedButton('two');
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
            fontSize: '20px',
            letterSpacing: '1.5px',
            padding: '10px 40px',
            borderRadius: '12px',
            textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `,
            filter: 'blur(0.75px)',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '2px solid ' + (selectedButton === 'three' ? 'rgb(179, 217, 255)' : 'rgba(179,217,255,0.5)'),
            boxShadow: selectedButton === 'three'
              ? '0 0 16px 4px rgba(179,217,255,0.4)'
              : 'none'
          }}
          onClick={() => {
            setAudioSrc('/audio/landing-song-three.mp3');
            setSelectedButton('three');
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
            fontSize: '25px',
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
      <div
        style={{
          position: 'fixed',
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          width: 420,
          background: 'rgba(10,20,40,0.35)',
          borderRadius: 16,
          padding: '12px 32px',
          boxShadow: '0 0 32px 8px rgba(179,217,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          border: '2px solid rgb(179, 217, 255)',
          textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `,
          fontFamily: 'VCR, monospace',
          filter: 'blur(0.2px)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <span style={{
          color: 'rgb(179, 217, 255)',
          fontFamily: 'VCR, monospace',
          minWidth: 48,
          textAlign: 'right',
          fontSize: '1.2rem',
          letterSpacing: '2px',
          textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `
        }}>
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step="0.01"
          onChange={handleSeek}
          style={{
            flex: 1,
            accentColor: '#b3d9ff',
            height: 8,
            borderRadius: 4,
            background: 'rgba(179,217,255,0.08)',
            boxShadow: `
        0 0 8px rgba(179,217,255,0.8),
        0 0 16px rgba(179,217,255,0.6)
      `,
            outline: 'none',
            border: '1.5px solid rgba(179,217,255,0.5)',
            margin: '0 12px',
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />
        <span style={{
          color: 'rgb(179, 217, 255)',
          fontFamily: 'VCR, monospace',
          minWidth: 48,
          textAlign: 'left',
          fontSize: '1.2rem',
          letterSpacing: '2px',
          textShadow: `
      0 0 8px rgba(179,217,255,0.8),
      0 0 16px rgba(179,217,255,0.6),
      0 0 32px rgba(179,217,255,0.4)
    `
        }}>
          {formatTime(duration)}
        </span>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 32,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <a
          href="https://www.instagram.com/romanscan_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(179,217,255,0.10)',
            borderRadius: '6px',
            padding: '6px',
            boxShadow: '0 0 16px 4px rgba(179,217,255,0.25)',
            filter: 'blur(0.2px)',
            transition: 'box-shadow 0.2s',
            border: 'none'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 448 512" fill="none">
            <rect x="64" y="64" width="320" height="320" rx="80" stroke="rgb(179, 217, 255)" strokeWidth="32" fill="none" />
            <circle cx="224" cy="224" r="80" stroke="rgb(179, 217, 255)" strokeWidth="32" fill="none" />
            <circle cx="336" cy="112" r="16" fill="rgb(179, 217, 255)" />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/@roman_scan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(179,217,255,0.10)',
            borderRadius: '6px',
            padding: '6px',
            boxShadow: '0 0 16px 4px rgba(179,217,255,0.25)',
            filter: 'blur(0.2px)',
            transition: 'box-shadow 0.2s',
            border: 'none'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="6" stroke="rgb(179, 217, 255)" strokeWidth="2" fill="none" />
            <polygon points="10,9 16,12 10,15" fill="rgb(179, 217, 255)" />
          </svg>
        </a>
        <a
          href="https://open.spotify.com/artist/6MhmflaNfZPXioLNadhYOb?si=d79EWalwRpORx8f37lpBFg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(179,217,255,0.10)',
            borderRadius: '6px',
            padding: '6px',
            boxShadow: '0 0 16px 4px rgba(179,217,255,0.25)',
            filter: 'blur(0.2px)',
            transition: 'box-shadow 0.2s',
            border: 'none'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgb(179, 217, 255)" strokeWidth="2" fill="none" />
            <path d="M8 15c2.5-1 5.5-1 8 0" stroke="rgb(179, 217, 255)" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 12c3-1.5 7-1.5 10 0" stroke="rgb(179, 217, 255)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 9.5c3.5-1 8-1 11.5 0" stroke="rgb(179, 217, 255)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </a>
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