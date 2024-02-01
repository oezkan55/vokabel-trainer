class DesktopNavView {
  #navigation = document.querySelector(".desktop-nav");

  addHandlerShowTarget(p_handler) {
    this.#navigation.addEventListener("click", e => {
      e.preventDefault();

      const btn = e.target.closest(".desktop-nav__link");

      if (!btn) return;

      p_handler(btn.dataset.target);
    });
  }
}

export default new DesktopNavView();
