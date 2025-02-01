import { videoElements } from "./variable.js";
import { showControls } from "./showControls.js";
import { showCursor } from "./showCursor.js";
export function forwardVideo() {
  videoElements.video.currentTime += 10;
  showControls();
  showCursor();
}
