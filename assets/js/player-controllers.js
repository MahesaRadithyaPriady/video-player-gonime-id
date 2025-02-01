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
  const PIP = document.querySelector(".PIP");
  const speedContainer = document.querySelector(".settings-content-speed");
  const speedTriger = document.querySelector("#speed");
  const volumeBtn = document.querySelector(".volume-toggle");
  const playPauseTengah = document.querySelector(".play-pause-tengah");
  const backward = document.querySelector(".backward");
  const forward = document.querySelector(".forward");
  const controlsTengah = document.querySelector(".controls-tengah");
  const speedTrackNormal = document.querySelector('.speed-normal');
  const speedTrackSlow = document.querySelector('.speed-0_5x');
  const speedTrackFast = document.querySelector('.speed-2x');
  const subtitleTrackID = document.querySelector('.subtitle-id');
  const subtitleCustom = document.querySelector('.subtitle-custom');
  const subtitleOff = document.querySelector('.subtitle-off');
  const loaderContainer = document.querySelector('.loader-container');
  const quality_1080p = document.querySelector('.quality-1080p');
  const quality_720p = document.querySelector('.quality-720p');
  const video_source = document.querySelector('.video-source')
  const normalSpeed = 1;
  const slowSpeed = 0.5;
  const speedFast = 2;

  let hideControlsTimeout;
  let hideCursorTimeout;
  let idleTimeout;

  video.controls = false;

  function hideControls() {
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
      controls.classList.add("hidenn-opacity");
      topElements.classList.add("hidenn-opacity");
      settingsContentQuality.classList.add("hidenn-opacity");
      settingsContainer.classList.remove("show");
      settingsContainer.classList.add("hidenn-opacity");
      subtitleTriger.classList.add("hidenn-opacity");
      speedContainer.classList.add("hidenn-opacity");
      controlsTengah.classList.add("hidenn-opacity");
    }, 5000);
  }

  function showControls() {
    clearTimeout(hideControlsTimeout);
    controls.classList.remove("hidenn-opacity");
    topElements.classList.remove("hidenn-opacity");
    settingsContainer.classList.remove("hidenn-opacity");
    settingsContentQuality.classList.remove("hidenn-opacity");
    subtitleTriger.classList.remove("hidenn-opacity");
    speedContainer.classList.remove("hidenn-opacity");
    controlsTengah.classList.remove("hidenn-opacity");
    hideControls();
  }

  function hideCursor() {
    clearTimeout(hideCursorTimeout);
    hideCursorTimeout = setTimeout(() => {
      videoWrapper.classList.add("hide-cursor");
    }, 5000);
  }

  function showCursor() {
    clearTimeout(hideCursorTimeout);
    videoWrapper.classList.remove("hide-cursor");
    hideCursor();
  }

  videoWrapper.addEventListener("mousemove", () => {
    clearTimeout(idleTimeout);
    showControls();
    showCursor();
    idleTimeout = setTimeout(() => {
      hideControls();
      hideCursor();
    }, 5000);
  });

    // ! Ubah Kecepatan Video

    function changeSpeedVideo(trackSpeed){
      video.playbackRate = trackSpeed
    }
  

  function updatePlayPauseIcon() {
    const iconBig = video.paused
      ? '<i class="fas fa-play fa-3x"></i>'
      : '<i class="fas fa-pause fa-3x"></i>';
    const icon = video.paused
      ? '<i class="fas fa-play"></i>'
      : '<i class="fas fa-pause"></i>';
    playPause.innerHTML = icon;
    playPauseTengah.innerHTML = iconBig;
  }

  //! Play/Pause Logic
  function togglePlayPause() {
    if (video.paused) {
      video.defaultPlaybackRate = normalSpeed;
      video.play();
      
    } else {
      video.pause();
    }
    updatePlayPauseIcon();
    showControls();
    showCursor();
  }

  playPause.addEventListener("click", togglePlayPause);
  playPauseTengah.addEventListener("click", togglePlayPause);
  video.addEventListener("play", updatePlayPauseIcon);
  video.addEventListener("pause", updatePlayPauseIcon);

  //! Forward (⏩) & Backward (⏪)
  function forwardVideo() {
    video.currentTime += 10;
    showControls();
    showCursor();
  }

  function backwardVideo() {
    video.currentTime = Math.max(0, video.currentTime - 10);
    showControls();
    showCursor();
  }

  forward.addEventListener("click", forwardVideo);
  backward.addEventListener("click", backwardVideo);

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
      subtitleTriger.classList.contains("flex") ||
      speedContainer.classList.contains("flex")
    ) {
      settingsContentQuality.classList.remove("show");
      settingsContainer.classList.remove("flex");
      subtitleTriger.classList.add("hidden");
      subtitleTriger.classList.remove("flex");
      speedContainer.classList.remove("flex");
      speedContainer.classList.add("hidden");
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
      !subtitleTriger.contains(e.target) &&
      !speedContainer.contains(e.target)
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
    video.playbackRate = normalSpeed;
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
      speedContainer.classList.add("hidden");
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
  //! Logika PIP
  function togglePictureInPicture() {
    if (document.pictureInPictureElement !== null) {
      document.exitPictureInPicture();
    } else {
      video.requestPictureInPicture();
    }
  }

  PIP.addEventListener("click", togglePictureInPicture);

  //! Settings speed trigger
  speedTriger.addEventListener("click", () => {
    speedContainer.classList.add("flex");
    speedContainer.classList.remove("hidden");
    settingsContainer.classList.remove("flex");
  });
  volumeBtn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      video.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  });


  speedTrackNormal.addEventListener('click',() => {
    video.playbackRate = normalSpeed;
    speedContainer.classList.remove('flex')
    speedContainer.classList.add('hidden')

  })

  speedTrackSlow.addEventListener('click',() => {
    video.playbackRate = slowSpeed;
    speedContainer.classList.remove('flex')
    speedContainer.classList.add('hidden')
  })

  speedTrackFast.addEventListener('click',() => {
    video.playbackRate = speedFast;
    speedContainer.classList.remove('flex')
    speedContainer.classList.add('hidden')
  })
 
  

  // ! Menambahkan Logic Subtitle

  // const trackID = document.createElement('track');
  // trackID.src ="/assets/subtitles/subtitles.vtt";
  // trackID.kind = "subtitles";
  // trackID.srclang = "id";
  // trackID.label = "bahasa indonesia";
  // trackID.default = false;

  // video.appendChild(trackID)

  // subtitleTrackID.addEventListener('click',() => {
  //   const track = video.textTracks[0];
  //   track.mode = "showing"
  //   subtitleTriger.classList.remove('flex')
  //   subtitleTriger.classList.add('hidden')

  //   console.log("di Klik")
  // })

  async function vttToArray(vttFile) {
    const response = await fetch(vttFile);
    const text = await response.text();
  
    const lines = text.split("\n").map(line => line.trim());
    const subtitles = [];
    let index = 0;
  
    while (index < lines.length) {
      if (lines[index] === "WEBVTT" || lines[index] === "") {
        index++; // Lewati header atau baris kosong
        continue;
      }
  
      // Format waktu VTT: 00:00:01.000 --> 00:00:04.000
      const timeMatch = lines[index].match(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/);
  
      if (timeMatch) {
        const start = timeToSeconds(timeMatch[1]); // Konversi waktu ke detik
        const end = timeToSeconds(timeMatch[2]);
        index++;
  
        let subtitleText = "";
        while (index < lines.length && lines[index] !== "") {
          subtitleText += lines[index] + " ";
          index++;
        }
  
        subtitles.push({ start, end, text: subtitleText.trim() });
      }
  
      index++;
    }
  
    return subtitles;
  }
  
  // Fungsi untuk mengubah waktu VTT menjadi detik
  function timeToSeconds(time) {
    const [hh, mm, ss] = time.split(":");
    return parseFloat(hh) * 3600 + parseFloat(mm) * 60 + parseFloat(ss);
  }
  
  // Contoh penggunaan
  vttToArray("/assets/subtitles/subtitles.vtt").then(subtitles => {

  let subtitleEnabled = false;

  subtitleTrackID.addEventListener('click',() => {
    subtitleEnabled = true;
    subtitleTriger.classList.remove('flex');
    subtitleTriger.classList.add('hidden');

  })

  subtitleOff.addEventListener('click', () => {
    subtitleEnabled = false;
    subtitleTriger.classList.remove('flex');
    subtitleTriger.classList.add('hidden');
  })

  // Update subtitle saat video berjalan
video.addEventListener("timeupdate", () => {
  if (!subtitleEnabled) {
    subtitleCustom.style.display = "none";
    return;
  }

  let currentTime = video.currentTime;
  let subtitle = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
  
  if (subtitle) {
    subtitleCustom.textContent = subtitle.text;
    subtitleCustom.style.display = "block";
  } else {
    subtitleCustom.style.display = "none";
  }
});

//! Fitur Loading

function loadingCheck(){
  if(loaderContainer.classList.contains('flex')){
    topElements.classList.add('hidden')
    controlsTengah.classList.add('hidden')
    controls.classList.add('hidden')
  }else{
    loaderContainer.classList.add('hidden')
  }
}

loadingCheck()



// ! Perubahan Resolusi
function changeVideoSource(newSrc) {
  const currentTime = video.currentTime;
  const isPlaying = !video.paused; 

  video_source.src = newSrc; 
  video.load(); 

  video.onloadeddata = () => {
    video.currentTime = currentTime; 
    if (isPlaying) video.play();
  };

  console.log("Resolusi diubah ke:", newSrc);
}

quality_1080p.addEventListener("click", () => {
  changeVideoSource("assets/video/video.mp4"); 
});
quality_720p.addEventListener("click", () => {
  changeVideoSource("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"); 
});
  });
});
