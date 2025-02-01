import { videoElements } from "./variable.js";
import { showControls } from "./showControls.js";
import { showCursor } from "./showCursor.js";
export function backwardVideo() {
  videoElements.video.currentTime = Math.max(
    0,
    videoElements.video.currentTime - 10
  );
  showControls();
  showCursor();
}
