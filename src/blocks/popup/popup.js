import closeSvg from "../../images/close.svg";
import { updateProfileInfo } from "../profile/profile";

const createElementWithClass = (assignedTag, assignedClass) => {
  const newElement = document.createElement(assignedTag);
  newElement.classList.add(assignedClass);
  return newElement;
};
const renderLoading = isLoading => {
  const button = document.querySelector(".popup__button");
  if (isLoading) {
    if (!button.classList.contains("popup__button_text")) {
      button.classList.add("popup__button_text");
    }
    button.textContent = "Загрузка...";
    console.log(button.textContent);
  }
};

export default class Popup {
  constructor(popup) {
    if (popup === "popup_edit-profile") {
      const patchProfileCollection = {
        header: "Редактировать профиль",
        popupFormName: "patchProfile",
        firstInputName: "username",
        firstInputPlaceholder: "Имя",
        firstInputClass: "popup__input_type_name",
        secondInputName: "about",
        secondInputPlaceHolder: "О себе",
        secondInputClass: "popup__input_type_about",
        buttonClass: "popup__button_text",
        buttonText: "Сохранить"
      };
      this.popupElement = this.create(patchProfileCollection);
    }
    if (popup === "popup_new-card") {
      const newCardCollection = {
        header: "Новое место",
        popupFormName: "newCard",
        firstInputName: "placename",
        firstInputPlaceholder: "Название",
        firstInputClass: "popup__input_type_name",
        secondInputName: "link",
        secondInputPlaceHolder: "Ссылка на картинку",
        secondInputClass: "popup__input_type_link-url",
        buttonClass: null,
        buttonText: "+"
      };
      this.popupElement = this.create(newCardCollection);
    }

    this.popupElement
      .querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));

    const form = this.popupElement.querySelector(".popup__form");
    form.addEventListener("submit", () => {
      event.preventDefault();
      renderLoading(true);
      if (form.name === "newCard") {
        cards.addCard(form.elements.placename.value, form.elements.link.value);
        this.close();
      } else if (form.name === "patchProfile") {
        updateProfileInfo(this.close.bind(this));
        /* Надо исправить: попап должен закрываться только если данные успешно отправлены на сервер */
      }
      renderLoading(false);
    });
  }
  create(collection) {
    const {
      header,
      popupFormName,
      firstInputName,
      firstInputPlaceholder,
      firstInputClass,
      secondInputName,
      secondInputPlaceHolder,
      secondInputClass,
      buttonClass,
      buttonText
    } = collection;

    const popupContainerElement = document.querySelector(".popup");
    const popupContentElement = createElementWithClass("div", "popup__content");
    const popupCloseButtonElement = createElementWithClass(
      "img",
      "popup__close"
    );
    const popupHeaderElement = createElementWithClass("h3", "popup__title");
    const popupFormElement = createElementWithClass("form", "popup__form");
    const firstPopupFieldElement = createElementWithClass(
      "div",
      "popup__field"
    );
    const secondPopupFieldElement = createElementWithClass(
      "div",
      "popup__field"
    );
    const firstInputElement = createElementWithClass("input", "popup__input");
    const secondInputElement = createElementWithClass("input", "popup__input");
    const buttonElement = createElementWithClass("button", "button");
    buttonElement.classList.add("popup__button");

    popupHeaderElement.textContent = header;
    popupFormElement.name = popupFormName;
    firstInputElement.name = firstInputName;
    firstInputElement.placeholder = firstInputPlaceholder;
    secondInputElement.name = secondInputName;
    secondInputElement.placeholder = secondInputPlaceHolder;
    buttonElement.textContent = buttonText;
    popupCloseButtonElement.src = closeSvg;

    firstInputElement.classList.add(firstInputClass);
    secondInputElement.classList.add(secondInputClass);
    buttonElement.classList.add(buttonClass);

    firstPopupFieldElement.appendChild(firstInputElement);
    secondPopupFieldElement.appendChild(secondInputElement);
    popupFormElement.appendChild(firstPopupFieldElement);
    popupFormElement.appendChild(secondPopupFieldElement);
    popupFormElement.appendChild(buttonElement);
    popupContentElement.appendChild(popupCloseButtonElement);
    popupContentElement.appendChild(popupHeaderElement);
    popupContentElement.appendChild(popupFormElement);
    popupContainerElement.appendChild(popupContentElement);

    return popupContainerElement;
  }
  open() {
    this.popupElement.classList.add("popup_is-opened");
    const button = this.popupElement.querySelector(".popup__button");
    button.setAttribute("disabled", true);
    button.classList.add(".popup__button_disabled");
  }
  close() {
    this.popupElement.classList.remove("popup_is-opened");
    this.popupElement.removeChild(this.popupElement.firstChild);
  }
}
