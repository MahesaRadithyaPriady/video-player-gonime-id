import { videoElements } from "./variable.js";
let hideCursorTimeout;
export function hideCursor() {
  clearTimeout(hideCursorTimeout);
  hideCursorTimeout = setTimeout(() => {
    videoElements.videoWrapper.classList.add("hide-cursor");
  }, 3000);
}
