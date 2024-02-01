class TranslateView {
  #btn = document.querySelector(".btn--translate");
  #inputGer = document.querySelector(".create-form__input--ger");
  #inputEng = document.querySelector(".create-form__input--eng");
  #loader = document.querySelector(".loader");

  addHandlerTranslate(p_handler) {
    this.#btn.addEventListener("click", e => {
      e.preventDefault();

      const gerWord = this.#inputGer.value.trim();

      if (!gerWord) return;

      p_handler(gerWord);
    });
  }

  renderTranslatedWord(p_word) {
    this.#inputEng.textContent = p_word;
  }

  toggleShowLoader() {
    this.#loader.classList.toggle("loader--aktive");
  }
}

export default new TranslateView();
