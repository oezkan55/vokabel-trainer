import icons from "url:../../img/icons/sprite.svg";

class TestFormView {
  #formContainer = document.querySelector(".form-container");
  #form = document.querySelector(".test-form");
  #message = document.querySelector(".message");
  #contentVokCount = document.querySelector(".test-form__count");
  #resultInfo = document.querySelector(".test-form__result");
  #btnNext = document.querySelector(".btn--next-vok");

  addHandlerCheckSolution(p_handler) {
    this.#form.addEventListener("submit", e => {
      e.preventDefault();

      const engWord = e.target[0].value.toLocaleLowerCase().trim();

      if (!engWord) return;

      p_handler(engWord);
    });
  }

  addHandlerNextVok(p_handler) {
    this.#btnNext.addEventListener("click", p_handler);
  }

  vokabelQuiz(p_testData) {
    this.#showForm();
    this.#updateVokCount(p_testData.vokabeln.length, p_testData.length);
    this.#renderWantedVokMessage(p_testData.wantedVok.german);
    this.#form.reset();
    this.renderSolutionState();
  }

  testOver(p_testResult) {
    this.#form.classList.add("test-form--disabled");
    this.#renderTestResultMessage(p_testResult);
  }

  #updateVokCount(p_currentCount, p_totalCount) {
    this.#contentVokCount.textContent = `${
      p_currentCount + 1
    } / ${p_totalCount}`;
  }

  #renderWantedVokMessage(p_wantedWord) {
    this.#message.innerHTML = `
      <div class="message__test">
        <p>Was bedeutet</p>
        <p class="message__test-ask">${p_wantedWord}</p>
      </div>
    `;
  }

  renderSolutionState(p_isCorrect = undefined) {
    this.#resultInfo.innerHTML = `${
      p_isCorrect
        ? '<span class="test-form__result-info--valid">🎉Richtig 😁🎉</span>'
        : '<span class="test-form__result-info--not-valid">❌Leider falsch ❌</span>'
    }`;

    if (p_isCorrect === undefined)
      this.#resultInfo.innerHTML = "<span>????</span>";
  }

  #renderTestResultMessage(p_result) {
    this.#message.innerHTML = `
      <div class="message__result">
        <p>Test ist zu Ende</p>
        <p class="message__result-test">
          <span>
            <svg class="message__result-icon">
              <use href="${icons}#icon-correct" />
            </svg>
            ${p_result.true}
          </span>
          <span>
            <svg class="message__result-icon">
              <use href="${icons}#icon-false" />
            </svg>
            ${p_result.false}
          </span>
        </p>
      </div>
    `;
  }

  #showForm() {
    this.#form.classList.remove("test-form--disabled");
    this.#formContainer.classList.add("form-container--back-side");
  }
}

export default new TestFormView();
