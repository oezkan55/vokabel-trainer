import icons from "url:../../img/icons/sprite.svg";

class VokabelListView {
  #list = document.querySelector(".vokabel-list");
  #sidebar = document.querySelector(".vokabeln");

  addHandlerDeleteVokabel(p_handler) {
    this.#list.addEventListener("click", e => {
      if (!e.target.closest(".btn--delete")) return;

      const vokabel = e.target.closest(".vokabel");
      const word = vokabel.dataset.word;
      p_handler(word, vokabel);
    });
  }

  removeVokabel(p_vokEl) {
    p_vokEl.remove();
  }

  renderList(p_vokabeln) {
    p_vokabeln.forEach(p_vok => {
      this.renderVokabel(p_vok);
    });
  }

  renderVokabel(p_vokabel) {
    const html = this.#getVokabelMarkup(p_vokabel);
    this.#list.insertAdjacentHTML("afterbegin", html);
  }

  showList() {
    this.#list.classList.remove("vokabel-list--hidden");
  }

  hideList() {
    this.#list.classList.add("vokabel-list--hidden");
  }

  mobileViewShowSidebar() {
    this.#sidebar.style.display = "block";
    this.showList();
  }

  mobileViewHideSidebar() {
    this.#sidebar.style.display = "none";
  }

  #getVokabelMarkup(p_vokabel) {
    return `
      <li class="vokabel" data-word="${p_vokabel.german}">
        <span class="vokabel__word">${p_vokabel.german}</span>
        <span class="vokabel__icon-arrow">
          <svg>
            <use href="${icons}#icon-arrow-right" />
          </svg>
        </span>
        <span class="vokabel__word">${p_vokabel.english}</span>
        <span class="vokabel__icon-flag">
          <svg>
            <use href="${icons}#icon-german-flag" />
          </svg>
        </span>
        <button class="btn btn--delete" title="Vokabel löschen">
          <svg>
            <use href="${icons}#icon-trash" />
          </svg>
        </button>
        <span class="vokabel__icon-flag">
          <svg>
            <use href="${icons}#icon-england-flag" />
          </svg>
        </span>
      </li>
    `;
  }
}

export default new VokabelListView();
