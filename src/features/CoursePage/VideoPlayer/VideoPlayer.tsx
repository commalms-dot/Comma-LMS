import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoUrl: string | null; // can be null
  posterUrl?: string;
  watchMode?: boolean;
  onTimeUpdate?: (timestamp: string) => void;
}

export interface VideoPlayerHandle {
  pause: () => void;
  getCurrentTime: () => number; // ✅ new function to get time
}

const DEFAULT_VIDEO_URL = "/videos/tesst.mp4";

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ videoUrl, posterUrl, watchMode = true, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      pause: () => videoRef.current?.pause(),
      getCurrentTime: () => videoRef.current?.currentTime || 0, // ✅ expose currentTime
    }));

    useEffect(() => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      // handle time updates
      const handleTimeUpdate = () => {
        if (onTimeUpdate) {
          const currentTime = videoEl.currentTime;
          const minutes = Math.floor(currentTime / 60);
          const seconds = Math.floor(currentTime % 60);
          const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          onTimeUpdate(formattedTime);
        }
      };

      videoEl.addEventListener("timeupdate", handleTimeUpdate);

      // set video source
      videoEl.src = videoUrl || DEFAULT_VIDEO_URL;
      videoEl.load();

      // autoplay requires muted video in most browsers
      videoEl.muted = true;
      if (watchMode) {
        videoEl
          .play()
          .then(() => console.log("Video autoplayed"))
          .catch(() =>
            console.warn(
              "Autoplay prevented. Video may require user interaction or muted attribute.",
            ),
          );
      }
      videoEl
        .play()
        .then(() => console.log("Video autoplayed"))
        .catch(() =>
          console.warn(
            "Autoplay prevented. Video may require user interaction or muted attribute.",
          ),
        );

      return () => {
        videoEl.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [videoUrl, onTimeUpdate, watchMode]);

    return (
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          poster={posterUrl}
          controls={watchMode}
          controlsList="nodownload"
          autoPlay
          muted
        >
          <source src={videoUrl || DEFAULT_VIDEO_URL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  },
);

export default VideoPlayer;
