const createElementWithClass = (assignedTag, assignedClass) => {
  const newElement = document.createElement(assignedTag);
  newElement.classList.add(assignedClass);
  return newElement;
};
const placesList = document.querySelector(".places-list");

export default class Card {
  constructor(name, link) {
    this.cardElement = this.create(name, link);
    this.cardElement
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.cardElement
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }
  create(nameValue, linkValue) {
    const card = createElementWithClass("div", "place-card");
    const cardImage = createElementWithClass("div", "place-card__image");
    const cardDeleteButton = createElementWithClass(
      "button",
      "place-card__delete-icon"
    );
    const cardDescription = createElementWithClass(
      "div",
      "place-card__description"
    );
    const nameInput = createElementWithClass("h3", "place-card__name");
    const cardLikeButton = createElementWithClass(
      "button",
      "place-card__like-icon"
    );

    cardImage.style.backgroundImage = `url('${linkValue}')`;
    nameInput.textContent = nameValue;

    cardDescription.appendChild(nameInput);
    cardDescription.appendChild(cardLikeButton);
    cardImage.appendChild(cardDeleteButton);
    card.appendChild(cardImage);
    card.appendChild(cardDescription);

    return card;
  }
  like(event) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
  remove(event) {
    const card = event.target.closest(".place-card");
    placesList.removeChild(card);
  }
}
