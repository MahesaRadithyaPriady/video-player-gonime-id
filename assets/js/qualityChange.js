import { videoElements } from "./variable.js";
export function changeVideoSource(newSrc, videoQuality, defaultQuality) {
  const currentTime = videoElements.video.currentTime;
  const isPlaying = !videoElements.video.paused;

  videoElements.video_source.src = newSrc;
  videoElements.video.load();

  videoElements.video.onloadeddata = () => {
    videoElements.video.currentTime = currentTime;
    if (isPlaying) videoElements.video.play();
  };

  // ! Tambahkan Selected
  switch (videoQuality) {
    case "1080p":
      videoElements.selected_1080p.classList.remove("hidden");
      videoElements.selected_720p.classList.add("hidden");
      videoElements.selected_480p.classList.add("hidden");
      videoElements.selected_360p.classList.add("hidden");
      break;

    case "720p":
      videoElements.selected_1080p.classList.add("hidden");
      videoElements.selected_720p.classList.remove("hidden");
      videoElements.selected_480p.classList.add("hidden");
      videoElements.selected_360p.classList.add("hidden");
      break;

    case "480p":
      videoElements.selected_1080p.classList.add("hidden");
      videoElements.selected_720p.classList.add("hidden");
      videoElements.selected_480p.classList.remove("hidden");
      videoElements.selected_360p.classList.add("hidden");
      break;

    case "360p":
      videoElements.selected_1080p.classList.add("hidden");
      videoElements.selected_720p.classList.add("hidden");
      videoElements.selected_480p.classList.add("hidden");
      videoElements.selected_360p.classList.remove("hidden");
      break;
  }

  videoElements.settingsContentQuality.classList.remove("flex");
  videoElements.settingsContentQuality.classList.remove("show");
  videoElements.settingsContentQuality.classList.add("hidden");
}
