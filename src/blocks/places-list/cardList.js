import { api } from "../../scripts/script";
import Card from "../place-card/card";

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
