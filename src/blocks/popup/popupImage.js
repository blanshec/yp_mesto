import closeSvg from "../../images/close.svg";

const createElementWithClass = (assignedTag, assignedClass) => {
  const newElement = document.createElement(assignedTag);
  newElement.classList.add(assignedClass);
  return newElement;
};

export default class PopupImage {
  constructor(image) {
    this.imageElement = this.create(image);
    this.popupElement = document.querySelector(".popup");
    this.popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));
  }
  create(image) {
    const popupContainerElement = document.querySelector(".popup");
    popupContainerElement.classList.add("popup_image-zoom");
    const popupContentElement = createElementWithClass(
      "div",
      "popup__content_image-zoom"
    );
    const popupCloseButtonElement = createElementWithClass(
      "img",
      "popup__close"
    );

    popupCloseButtonElement.src = closeSvg;
    popupContentElement.style.backgroundImage = image.style.backgroundImage;

    popupContentElement.appendChild(popupCloseButtonElement);
    popupContainerElement.appendChild(popupContentElement);

    return popupContainerElement;
  }
  open() {
    this.popupElement.classList.add("popup_is-opened");
  }
  close() {
    this.popupElement.classList.remove("popup_is-opened");
    this.popupElement.removeChild(this.popupElement.firstChild);
  }
}
