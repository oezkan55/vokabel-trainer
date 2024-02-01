class ApplicationView {
  #application = document.querySelector(".application");

  mobileViewShowApplication() {
    this.#application.style.display = "flex";
  }

  mobileViewHideApplication() {
    this.#application.style.display = "none";
  }
}

export default new ApplicationView();
