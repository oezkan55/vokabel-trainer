class MobileNavView {
  #mobileNav = document.querySelector(".mobile-nav");
  #btn = document.querySelector(".mobile-nav__btn");
  #navigation = document.querySelector(".mobile-nav__navigation");

  constructor() {
    this.#addHandlerToggleNavigation();
  }

  toggleOpenNavigation() {
    this.#mobileNav.classList.toggle("mobile-nav--open");
  }

  #addHandlerToggleNavigation() {
    this.#btn.addEventListener("click", this.toggleOpenNavigation.bind(this));
  }

  addHandlerShowTarget(p_handlerNavigation, p_handlerMobNav) {
    this.#navigation.addEventListener("click", e => {
      e.preventDefault();

      const btn = e.target.closest(".mobile-nav__link");

      if (!btn) return;

      p_handlerNavigation(btn.dataset.target);
      p_handlerMobNav(btn.dataset.mobile);
    });
  }
}

export default new MobileNavView();
