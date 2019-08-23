import Api from "../../scripts/api";
import Card from "../place-card/card";
const api = new Api({
  baseUrl: "https://praktikum.tk/cohort1",
  headers: {
    authorization: "8020023e-2e14-4363-981a-b57e84f9819e",
    "Content-Type": "application/json"
  }
});

export default class CardList {
  constructor(container) {
    this.container = container;
    this.render();
  }
  addCard(name, link) {
    const { cardElement } = new Card(name, link);
    this.container.appendChild(cardElement);
    cardElement.addEventListener("click", this.like);
  }
  render() {
    api
      .getInitialCards()
      .then(cardsList => {
        if (cardsList.length) {
          /* Можно лучше: можно писать просто if (cardsList.length), а не сравнивать с нулем потом инвертировать */
          cardsList.forEach(card => {
            this.addCard(card.name, card.link);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
