import { videoElements } from "./variable.js";
export function togglePictureInPicture() {
  if (document.pictureInPictureElement !== null) {
    document.exitPictureInPicture();
  } else {
    videoElements.video.requestPictureInPicture();
  }
}
