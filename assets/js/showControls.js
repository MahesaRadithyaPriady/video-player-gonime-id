import { videoElements } from "./variable.js";
import { hideControls } from "./hideControls.js";
let hideControlsTimeout;
export function showControls() {
  clearTimeout(hideControlsTimeout);
  videoElements.controls.classList.remove("hidenn-opacity");
  videoElements.topElements.classList.remove("hidenn-opacity");
  videoElements.settingsContainer.classList.remove("hidenn-opacity");
  videoElements.settingsContentQuality.classList.remove("hidenn-opacity");
  videoElements.subtitleTriger.classList.remove("hidenn-opacity");
  videoElements.speedContainer.classList.remove("hidenn-opacity");
  videoElements.controlsTengah.classList.remove("hidenn-opacity");
  hideControls();
}
