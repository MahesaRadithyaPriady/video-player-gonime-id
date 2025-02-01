import { videoElements } from "./variable.js";
export function updatePlayPauseIcon() {
  const iconBig = videoElements.video.paused
    ? '<i class="fas fa-play fa-3x"></i>'
    : '<i class="fas fa-pause fa-3x"></i>';
  const icon = videoElements.video.paused
    ? '<i class="fas fa-play"></i>'
    : '<i class="fas fa-pause"></i>';
  videoElements.playPause.innerHTML = icon;
  videoElements.playPauseTengah.innerHTML = iconBig;
}
