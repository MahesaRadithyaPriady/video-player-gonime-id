import { videoElements } from "./variable.js";
let hideControlsTimeout;

export function hideControls() {
  clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    videoElements.controls.classList.add("hidenn-opacity");
    videoElements.topElements.classList.add("hidenn-opacity");
    videoElements.settingsContentQuality.classList.add("hidenn-opacity");
    videoElements.settingsContainer.classList.remove("show");
    videoElements.settingsContainer.classList.add("hidenn-opacity");
    videoElements.subtitleTriger.classList.add("hidenn-opacity");
    videoElements.speedContainer.classList.add("hidenn-opacity");
    videoElements.controlsTengah.classList.add("hidenn-opacity");
  }, 3000);
}
