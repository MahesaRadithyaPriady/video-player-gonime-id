import { videoElements } from "./variable.js";
export function loadingCheck() {
  if (videoElements.loaderContainer.classList.contains("flex")) {
    videoElements.topElements.classList.add("hidden");
    videoElements.controlsTengah.classList.add("hidden");
    videoElements.controls.classList.add("hidden");
  } else {
    videoElements.loaderContainer.classList.add("hidden");
  }
}
