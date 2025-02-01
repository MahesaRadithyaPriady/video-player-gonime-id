import { showControls } from "./showControls.js";
import { showCursor } from "./showCursor.js";
import { hideControls } from "./hideControls.js";
import { hideCursor } from "./hideCursor.js";

let idleTimeout;

function handleMouseMoveFullscreen() {
  clearTimeout(idleTimeout);
  showControls();
  showCursor();

  idleTimeout = setTimeout(() => {
    hideControls();
    hideCursor();
  }, 5000); //! Hide Controls Setalah 5 Detik
}
export function handleFullScreenChange() {
  if (document.fullscreenElement) {
    document.addEventListener("mousemove", handleMouseMoveFullscreen);
  } else {
    document.removeEventListener("mousemove", handleMouseMoveFullscreen);
  }
}
