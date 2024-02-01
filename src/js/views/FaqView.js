class FaqView {
  #faq = document.querySelector(".faq");
  #overlay = document.querySelector(".overlay");
  #btnModal = document.querySelector(".btn--close-modal");
  #items = document.querySelectorAll(".faq__item");

  constructor() {
    this.#hideModal();
    this.#toggleOpenItem();
  }

  #toggleOpenItem() {
    this.#faq.addEventListener("click", e => {
      //? Schutzklausel
      if (!e.target.closest(".btn--faq-item")) return;

      const faqItem = e.target.closest(".faq__item");
      faqItem.classList.toggle("faq__item--open");
    });
  }

  #hideModal() {
    this.#overlay.addEventListener("click", this.toggleShowModal.bind(this));
    this.#btnModal.addEventListener("click", this.toggleShowModal.bind(this));
  }

  toggleShowModal() {
    this.#overlay.classList.toggle("overlay--hidden");
    this.#faq.classList.toggle("faq--hidden");
    this.#items.forEach(p_item => p_item.classList.remove("faq__item--open"));
  }
}

export default new FaqView();
