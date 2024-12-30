"use client";
import { useRef, useState, useEffect } from "react";
import "./videoPlayer.css";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleLoadedMetadata = () => {
        const videoDuration = video.duration || 0;
        setDuration(videoDuration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime || 0);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      if (video.readyState >= 1) {
        handleLoadedMetadata();
      }

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      video.volume = parseFloat(e.target.value);
    }
  };

  const rewind = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime -= 10;
    }
  };

  const fastForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += 10;
    }
  };

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      video.requestFullscreen();
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const newTime = parseFloat(e.target.value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="video-player position-relative"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setTimeout(() => setShowControls(false), 300)}
    >
      <video ref={videoRef} id="video" width="600">
        <source src={src} type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>

      <div
        className={`controls d-flex flex-column position-absolute shadow-lg ${
          showControls ? "show-control" : ""
        }`}
      >
        <div className="d-flex align-items-center gap-2">
          <span className="text-white">
            {formatTime(duration - currentTime)}
          </span>
          <input
            value={currentTime}
            type="range"
            min={0}
            max={duration}
            step="0.1"
            onChange={handleRangeChange}
            className="flex-grow-1 progress-bar"
          />
          <span className="text-white">{formatTime(currentTime)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex gap-3">
            <button
              onClick={enterFullscreen}
              id="fullscreen"
              className="video-player-icon"
            >
              <i className="fa-solid fa-expand"></i>
            </button>

            <input
              onInput={handleVolumeChange}
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="1"
            />

            <button
              onClick={toggleMute}
              id="mute"
              className="video-player-icon"
            >
              {isMuted ? (
                <i className="fa-solid fa-volume-xmark"></i>
              ) : (
                <i className="fa-solid fa-volume-high"></i>
              )}
            </button>

            

            <button
              onClick={fastForward}
              id="fast-forward"
              className="video-player-icon"
            >
              <i className="fa-solid fa-forward"></i>
            </button>
            <button onClick={rewind} id="rewind" className="video-player-icon">
              <i className="fa-solid fa-backward"></i>
            </button>
          </div>

          <button
            onClick={togglePlayPause}
            id="play-pause"
            className="video-player-icon"
          >
            {isPlaying ? (
              <i className="fa-solid fa-pause text-white"></i>
            ) : (
              <i className="fa-solid fa-play text-white"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
