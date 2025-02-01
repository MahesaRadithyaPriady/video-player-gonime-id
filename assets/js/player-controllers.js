import { hideControls } from "./hideControls.js";
import { showControls } from "./showControls.js";
import { hideCursor } from "./hideCursor.js";
import { showCursor } from "./showCursor.js";
import { updatePlayPauseIcon } from "./updatePlayPause.js";
import { togglePlayPause } from "./togglePlayPause.js";
import { forwardVideo } from "./forwardLogic.js";
import { backwardVideo } from "./backwardLogic.js";
import { formatTime } from "./formatTime.js";
import { handleFullScreenChange } from "./handleFullscreen.js";
import { togglePictureInPicture } from "./LogicPIPVideo.js";
import { vttToArray } from "./VTTtoArray.js";
import { loadingCheck } from "./loadingCheck.js";
import { changeVideoSource } from "./qualityChange.js";
import { videoElements } from "./variable.js";

document.addEventListener("DOMContentLoaded", () => {
  const normalSpeed = 1;
  const slowSpeed = 0.5;
  const speedFast = 2;

  let idleTimeout;

  videoElements.video.controls = false;

  videoElements.playPause.addEventListener("click", togglePlayPause);
  videoElements.playPauseTengah.addEventListener("click", togglePlayPause);
  videoElements.video.addEventListener("play", updatePlayPauseIcon);
  videoElements.video.addEventListener("pause", updatePlayPauseIcon);

  videoElements.forward.addEventListener("click", forwardVideo);
  videoElements.backward.addEventListener("click", backwardVideo);

  //! Fullscreen Button
  videoElements.fullScreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      videoElements.videoWrapper
        .requestFullscreen()
        .catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
    showControls();
    showCursor();
  });

  //! Update Progress Bar
  videoElements.video.addEventListener("timeupdate", () => {
    const progress =
      (videoElements.video.currentTime / videoElements.video.duration) * 100;
    videoElements.progressFill.style.width = `${progress}%`;

    const currentTime = formatTime(videoElements.video.currentTime);
    const duration = formatTime(videoElements.video.duration);
    videoElements.timeLine.textContent = `${currentTime} / ${duration}`;
  });

  //! Klik Progress Bar Untuk Pindah Posisi Video
  videoElements.progressBar.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const progressWidth = videoElements.progressBar.clientWidth;
    const seekTime = (clickX / progressWidth) * videoElements.video.duration;
    videoElements.video.currentTime = seekTime;
    showControls();
    showCursor();
  });

  //! Handle mouse enter and mouse leave
  videoElements.video.addEventListener("mouseenter", () => {
    showControls();
    showCursor();
  });

  videoElements.video.addEventListener("mouseleave", () => {
    hideControls();
    hideCursor();
  });

  //! Handle fullscreen changes
  document.addEventListener("fullscreenchange", handleFullScreenChange);

  //! Add mousemove listener for non-fullscreen video
  videoElements.video.addEventListener("mousemove", () => {
    clearTimeout(idleTimeout);
    showControls();
    showCursor();

    idleTimeout = setTimeout(() => {
      hideControls();
      hideCursor();
    }, 5000); //! Hide Controls Setalah 5 Detik
  });

  //! Show settings popup
  videoElements.settingsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    videoElements.settingsContainer.classList.toggle("flex");
    if (
      videoElements.settingsContentQuality.classList.contains("show") ||
      videoElements.subtitleTriger.classList.contains("flex") ||
      videoElements.speedContainer.classList.contains("flex")
    ) {
      videoElements.settingsContentQuality.classList.remove("show");
      videoElements.settingsContainer.classList.remove("flex");
      videoElements.subtitleTriger.classList.add("hidden");
      videoElements.subtitleTriger.classList.remove("flex");
      videoElements.speedContainer.classList.remove("flex");
      videoElements.speedContainer.classList.add("hidden");
    }

    if (videoElements.settingsContainer.classList.contains("flex")) {
      const settingsMain = document.querySelector(".settings-main");
      settingsMain.classList.add("show");
    }
  });

  //! Hide settings popup
  document.addEventListener("click", (e) => {
    if (
      !videoElements.settingsContainer.contains(e.target) &&
      !videoElements.settingsButton.contains(e.target) &&
      !videoElements.backButton.contains(e.target) &&
      !videoElements.subtitleTriger.contains(e.target) &&
      !videoElements.speedContainer.contains(e.target)
    ) {
      videoElements.settingsContainer.classList.remove("flex");
    }
  });

  //! Pajangan
  videoElements.settingsContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //!! Reset play button ketika video selesai
  videoElements.video.addEventListener("ended", () => {
    videoElements.video.playbackRate = normalSpeed;
    videoElements.playPause.innerHTML = '<i class="fas fa-play"></i>';
  });

  //!! Settings quality trigger
  videoElements.qualityTriger.addEventListener("click", () => {
    const qualitySettings = document.querySelector(".settings-content-quality");
    videoElements.settingsContainer.classList.remove("flex");
    qualitySettings.classList.add("show");
  });

  //!! Menambahkan event listener untuk tombol "Back"
  videoElements.backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const settingsMain = document.querySelector(".settings-main");
      settingsMain.classList.add("show");
      videoElements.settingsContentQuality.classList.remove("show");
      videoElements.subtitleTriger.classList.add("hidden");
      videoElements.speedContainer.classList.add("hidden");
      videoElements.settingsContainer.classList.add("flex");
    });
  });

  //! Settings subtitle trigger
  subtitle.addEventListener("click", () => {
    const subtitleSettings = document.querySelector(
      ".settings-content-subtitle"
    );
    videoElements.settingsContainer.classList.remove("flex");
    subtitleSettings.classList.add("flex");
    subtitleSettings.classList.remove("hidden");
  });

  videoElements.settingsMain.addEventListener("mousemove", () => {
    showControls();
    showCursor();
  });

  videoElements.video.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  videoElements.PIP.addEventListener("click", togglePictureInPicture);

  //! Settings speed trigger
  videoElements.speedTriger.addEventListener("click", () => {
    videoElements.speedContainer.classList.add("flex");
    videoElements.speedContainer.classList.remove("hidden");
    videoElements.settingsContainer.classList.remove("flex");
  });

  videoElements.volumeBtn.addEventListener("click", () => {
    if (videoElements.video.muted) {
      videoElements.video.muted = false;
      videoElements.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      videoElements.video.muted = true;
      videoElements.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });

  videoElements.speedTrackNormal.addEventListener("click", () => {
    videoElements.video.playbackRate = normalSpeed;
    videoElements.speedContainer.classList.remove("flex");
    videoElements.speedContainer.classList.add("hidden");
  });

  videoElements.speedTrackSlow.addEventListener("click", () => {
    videoElements.video.playbackRate = slowSpeed;
    videoElements.speedContainer.classList.remove("flex");
    videoElements.speedContainer.classList.add("hidden");
  });

  videoElements.speedTrackFast.addEventListener("click", () => {
    videoElements.video.playbackRate = speedFast;
    videoElements.speedContainer.classList.remove("flex");
    videoElements.speedContainer.classList.add("hidden");
  });

  // ! Menambahkan Logic Subtitle

  vttToArray("/assets/subtitles/subtitles.vtt").then((subtitles) => {
    let subtitleEnabled = false;

    videoElements.subtitleTrackID.addEventListener("click", () => {
      subtitleEnabled = true;
      videoElements.subtitleTriger.classList.remove("flex");
      videoElements.subtitleTriger.classList.add("hidden");
    });

    videoElements.subtitleOff.addEventListener("click", () => {
      subtitleEnabled = false;
      videoElements.subtitleTriger.classList.remove("flex");
      videoElements.subtitleTriger.classList.add("hidden");
    });

    // Update subtitle saat video berjalan
    videoElements.video.addEventListener("timeupdate", () => {
      if (!subtitleEnabled) {
        videoElements.subtitleCustom.style.display = "none";
        return;
      }

      let currentTime = videoElements.video.currentTime;
      let subtitle = subtitles.find(
        (s) => currentTime >= s.start && currentTime <= s.end
      );

      if (subtitle) {
        videoElements.subtitleCustom.textContent = subtitle.text;
        videoElements.subtitleCustom.style.display = "block";
      } else {
        videoElements.subtitleCustom.style.display = "none";
      }
    });

    //! Fitur Loading

    loadingCheck();

    // ! Perubahan Resolusi

    videoElements.quality_1080p.addEventListener("click", () => {
      changeVideoSource("assets/video/video.mp4", "1080p");
    });
    videoElements.quality_720p.addEventListener("click", () => {
      changeVideoSource("assets/video/video.mp4", "720p");
    });
    videoElements.quality_480p.addEventListener("click", () => {
      changeVideoSource("assets/video/video.mp4", "480p", "default");
    });
    videoElements.quality_360p.addEventListener("click", () => {
      changeVideoSource("assets/video/video.mp4", "360p");
    });
  });

  // Video Loading

  videoElements.video.addEventListener("waiting", () => {
    videoElements.loaderContainer.classList.remove("hidden");
    videoElements.loaderContainer.classList.add("flex");
    videoElements.topElements.classList.add("hidden");
    videoElements.controlsTengah.classList.add("hidden");
    videoElements.controls.classList.add("hidden");
  });

  videoElements.video.addEventListener("canplay", () => {
    videoElements.loaderContainer.classList.remove("flex");
    videoElements.loaderContainer.classList.add("hidden");
    videoElements.topElements.classList.remove("hidden");
    videoElements.controlsTengah.classList.remove("hidden");
    videoElements.controls.classList.remove("hidden");
  });
});
