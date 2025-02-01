import { videoElements } from "./variable.js";
import { hideCursor } from "./hideCursor.js";
let hideCursorTimeout;

export function showCursor() {
  clearTimeout(hideCursorTimeout);
  videoElements.videoWrapper.classList.remove("hide-cursor");
  hideCursor();
}
