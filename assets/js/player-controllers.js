document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const playPause = document.querySelector(".play");
  const fullScreen = document.querySelector(".fullScreen");
  const timeLine = document.querySelector(".time-line");
  const progressBar = document.querySelector(".progress-bar");
  const progressFill = document.querySelector(".progress-fill");
  const controls = document.querySelector(".controls");
  const topElements = document.querySelector(".top-elements");
  const videoWrapper = document.querySelector(".video-wrapper");
  const settingsButton = document.querySelector(".settings");
  const settingsContainer = document.querySelector(".settings-container");
  const qualityTriger = document.querySelector(".quality-triger");
  const backButton = document.querySelector(".back-button");
  const settingsContentQuality = document.querySelector(
    ".settings-content-quality"
  );
  const subtitleTriger = document.querySelector(".settings-content-subtitle");
  const backButtons = document.querySelectorAll(".back-button");
  const settingsMain = document.querySelector(".settings-main");

  let hideControlsTimeout;
  let hideCursorTimeout;
  let idleTimeout;

  video.controls = false;

  function hideControls() {
    hideControlsTimeout = setTimeout(() => {
      controls.classList.add("hidenn-opacity");
      topElements.classList.add("hidenn-opacity");
      settingsContentQuality.classList.add("hidenn-opacity");
      settingsContainer.classList.remove("show");
      settingsContainer.classList.add("hidenn-opacity");
      subtitleTriger.classList.add("hidenn-opacity");
    }, 5000);
  }

  function showControls() {
    clearTimeout(hideControlsTimeout);
    controls.classList.remove("hidenn-opacity");
    topElements.classList.remove("hidenn-opacity");
    settingsContainer.classList.remove("hidenn-opacity");
    settingsContentQuality.classList.remove("hidenn-opacity");
    subtitleTriger.classList.remove("hidenn-opacity");

    hideControls(); //! Hide Controls Setelah 5 Detik
  }

  function hideCursor() {
    hideCursorTimeout = setTimeout(() => {
      videoWrapper.classList.add("hide-cursor");
    }, 5000);
  }

  function showCursor() {
    clearTimeout(hideCursorTimeout);
    videoWrapper.classList.remove("hide-cursor");
    hideCursor(); //! Hide Cursor Setelah 5 Detik
  }

  //! Play/Pause Button
  playPause.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playPause.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playPause.innerHTML = '<i class="fas fa-play"></i>';
    }
    showControls();
    showCursor();
  });

  //! Fullscreen Button
  fullScreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
    showControls();
    showCursor();
  });

  //! Update Progress Bar
  video.addEventListener("timeupdate", () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressFill.style.width = `${progress}%`;

    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timeLine.textContent = `${currentTime} / ${duration}`;
  });

  //! Klik Progress Bar Untuk Pindah Posisi Video
  progressBar.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const progressWidth = progressBar.clientWidth;
    const seekTime = (clickX / progressWidth) * video.duration;
    video.currentTime = seekTime;
    showControls();
    showCursor();
  });

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  //! Handle mouse enter and mouse leave
  video.addEventListener("mouseenter", () => {
    showControls();
    showCursor();
  });

  video.addEventListener("mouseleave", () => {
    hideControls();
    hideCursor();
  });

  //! Handle fullscreen changes
  function handleFullScreenChange() {
    if (document.fullscreenElement) {
      document.addEventListener("mousemove", handleMouseMoveFullscreen);
    } else {
      document.removeEventListener("mousemove", handleMouseMoveFullscreen);
    }
  }

  //! Handle mouse move for fullscreen
  function handleMouseMoveFullscreen() {
    clearTimeout(idleTimeout);
    showControls();
    showCursor();

    idleTimeout = setTimeout(() => {
      hideControls();
      hideCursor();
    }, 5000); //! Hide Controls Setalah 5 Detik
  }

  //! Add event listener for fullscreen changes
  document.addEventListener("fullscreenchange", handleFullScreenChange);

  //! Add mousemove listener for non-fullscreen video
  video.addEventListener("mousemove", () => {
    clearTimeout(idleTimeout);
    showControls();
    showCursor();

    idleTimeout = setTimeout(() => {
      hideControls();
      hideCursor();
    }, 5000); //! Hide Controls Setalah 5 Detik
  });

  //! Show settings popup
  settingsButton.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsContainer.classList.toggle("flex");
    if (
      settingsContentQuality.classList.contains("show") ||
      subtitleTriger.classList.contains("flex")
    ) {
      settingsContentQuality.classList.remove("show");
      settingsContainer.classList.remove("flex");
      subtitleTriger.classList.add("hidden");
      subtitleTriger.classList.remove("flex");
    }

    if (settingsContainer.classList.contains("flex")) {
      const settingsMain = document.querySelector(".settings-main");
      settingsMain.classList.add("show");
    }
  });

  //! Hide settings popup
  document.addEventListener("click", (e) => {
    if (
      !settingsContainer.contains(e.target) &&
      !settingsButton.contains(e.target) &&
      !backButton.contains(e.target) &&
      !subtitleTriger.contains(e.target)
    ) {
      settingsContainer.classList.remove("flex");
    }
  });

  //! Pajangan
  settingsContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  //!! Reset play button ketika video selesai
  video.addEventListener("ended", () => {
    playPause.innerHTML = '<i class="fas fa-play"></i>';
  });

  //!! Settings quality trigger
  qualityTriger.addEventListener("click", () => {
    const qualitySettings = document.querySelector(".settings-content-quality");
    settingsContainer.classList.remove("flex");
    qualitySettings.classList.add("show");
  });

  //!! Menambahkan event listener untuk tombol "Back"
  backButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const settingsMain = document.querySelector(".settings-main");
      settingsMain.classList.add("show");
      settingsContentQuality.classList.remove("show");
      subtitleTriger.classList.add("hidden");
      settingsContainer.classList.add("flex");
    });
  });
  //! Settings subtitle trigger
  subtitle.addEventListener("click", () => {
    const subtitleSettings = document.querySelector(
      ".settings-content-subtitle"
    );
    settingsContainer.classList.remove("flex");
    subtitleSettings.classList.add("flex");
    subtitleSettings.classList.remove("hidden");
  });

  settingsMain.addEventListener("mousemove", () => {
    showControls();
    showCursor();
  });

  video.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
});
