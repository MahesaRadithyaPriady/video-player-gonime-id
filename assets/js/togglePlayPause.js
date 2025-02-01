import { videoElements } from "./variable.js";
import { updatePlayPauseIcon } from "./updatePlayPause.js";
import { showControls } from "./showControls.js";
import { showCursor } from "./showCursor.js";
import { variableTrackSpeed } from "./variableTrackSpeed.js";
export function togglePlayPause() {
  if (videoElements.video.paused) {
    videoElements.video.defaultPlaybackRate = variableTrackSpeed.normalSpeed;
    videoElements.video.play();
  } else {
    videoElements.video.pause();
  }
  updatePlayPauseIcon();
  showControls();
  showCursor();
}
