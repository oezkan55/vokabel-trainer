class CreateFormView {
  #form = document.querySelector(".create-form");
  #inputGer = document.querySelector(".create-form__input--ger");
  #inputEng = document.querySelector(".create-form__input--eng");
  #message = document.querySelector(".message");
  #formContainer = document.querySelector(".form-container");

  addHandlerCreate(p_handler) {
    this.#form.addEventListener("submit", e => {
      e.preventDefault();

      if (this.#isInputEmpty(e.target)) return;

      const data = [...new FormData(this.#form)];
      const formatted = this.#formatData(data);
      this.#clearImputFields();
      p_handler(formatted);
    });
  }

  #formatData(p_data) {
    return p_data.map(p_arr => [p_arr[0], p_arr[1].toLocaleLowerCase().trim()]);
  }

  #isInputEmpty(p_target) {
    return p_target[0].value.trim() === "" || p_target[1].value.trim() === "";
  }

  #clearImputFields() {
    this.#inputGer.value = "";
    this.#inputEng.textContent = "";
  }

  renderAddedMessage() {
    this.#message.innerHTML = `
      <p class="message__added">Vokabel hinzugefügt🙂</p>
    `;
  }

  #hideMessage() {
    this.#message.textContent = "";
  }

  showForm() {
    this.#hideMessage();
    this.#formContainer.classList.remove("form-container--back-side");
  }
}

export default new CreateFormView();
