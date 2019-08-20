//helper function
import closeSvg from "../images/close.svg";
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

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.auth = options.headers.authorization;
  }
  async getInitialCards() {
    const res = await fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.auth
      }
    });
    if (res.ok) {
      /* Можно лучше: лучше преобразование в json оставить в классе Api в методе getInitialCards, а из него
      возвращать уже готовые данные */
      return res.json();
    }
    return Promise.reject(`An error occured: ${res.status}`);
  }
  async getUserData() {
    const res = await fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.auth
      }
    });
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`An error occured: ${res.status}`);
  }
  patchProfile(name, job) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }
}
class Card {
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
class CardList {
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
class Popup {
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
    disableSubmitButton(this.popupElement.querySelector(".popup__button"));
  }
  close() {
    this.popupElement.classList.remove("popup_is-opened");
    this.popupElement.removeChild(this.popupElement.firstChild);
  }
}
class PopupImage {
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

const api = new Api({
  baseUrl: "https://praktikum.tk/cohort1",
  headers: {
    authorization: "8020023e-2e14-4363-981a-b57e84f9819e",
    "Content-Type": "application/json"
  }
});

const placesList = document.querySelector(".places-list");
const cards = new CardList(placesList);

// FORM VALIDATION BLOCK START
const disableSubmitButton = button => {
  button.setAttribute("disabled", true);
  button.classList.add(".popup__button_disabled");
};
const validateInput = () => {
  const [nameInput, infoInput, submitButton] = event.target.closest(
    ".popup__form"
  ).elements;

  if (infoInput.value && nameInput.value) {
    submitButton.removeAttribute("disabled");
    submitButton.classList.remove(".popup__button_disabled");
  }

  resetError(nameInput.parentNode);
  if (!nameInput.value) {
    disableSubmitButton(submitButton);
    showError(nameInput, "Это обязательное поле");
  } else if (nameInput.value.length < 2 || nameInput.value.length > 30) {
    showError(nameInput, "Должно быть от 2 до 30 символов");
    disableSubmitButton(submitButton);
  }

  resetError(infoInput.parentNode);
  if (!infoInput.value) {
    disableSubmitButton(submitButton);
    showError(infoInput, "Это обязательное поле");
  } else if (infoInput.name === "link") {
    const LINK_EXPRESSION = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(LINK_EXPRESSION);
    if (!infoInput.value.match(regex)) {
      disableSubmitButton(submitButton);
      showError(infoInput, "Здесь должна быть ссылка");
    }
  } else if (infoInput.name === "about") {
    if (infoInput.value.length < 2 || infoInput.value.length > 30) {
      showError(infoInput, "Должно быть от 2 до 30 символов");
      disableSubmitButton(submitButton);
    }
  }
};
const showError = (referenceField, message) => {
  const error = createElementWithClass("span", "popup__error-message");
  error.textContent = message;
  referenceField.insertAdjacentElement("afterend", error);
};
const resetError = container => {
  const error = container.querySelector(".popup__error-message");
  if (error) {
    container.removeChild(error);
  }
};
// FORM VALIDATION BLOCK END

// UPDATE PROFILE INFO BLOCK START
const loadProfile = () => {
  const [userName, userJob] = document.querySelector(
    ".user-info__data"
  ).children;
  const userAvatar = document.querySelector(".user-info__photo");

  api
    .getUserData()
    .then(fetchedData => {
      userName.textContent = fetchedData.name;
      userJob.textContent = fetchedData.about;
      userAvatar.style.backgroundImage = fetchedData.avatar;
    })
    .catch(error => {
      console.log(error);
    });
};
const updateProfileInfo = closePopup => {
  event.preventDefault();
  const [inputName, inputJob] = event.target.closest(".popup__form").elements;
  api
    .patchProfile(inputName.value, inputJob.value)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`An error occured: ${res.status}`);
    })
    .then(() => {
      loadProfile();
      closePopup();
    })
    .catch(error => {
      console.log(error);
    });
};
const insertUserDataToInput = popupElement => {
  const [userName, userJob] = document.querySelector(
    ".user-info__data"
  ).children;
  const form = popupElement.querySelector(".popup__form");
  const [inputName, inputJob] = form.elements;
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
};

// UPDATE PROFILE INFO BLOCK END

//forms
document.querySelector(".root").addEventListener("input", validateInput);
document.querySelector(".profile").addEventListener("click", () => {
  if (event.target.classList.contains("user-info__button")) {
    const popup = new Popup("popup_new-card");
    popup.open();
  } else if (event.target.classList.contains("user-info__button_edit")) {
    const popup = new Popup("popup_edit-profile");
    popup.open();
    insertUserDataToInput(popup.popupElement);
  }
});
document.querySelector(".places-list").addEventListener("click", () => {
  if (event.target.classList.contains("place-card__image")) {
    const popup = new PopupImage(event.target);
    popup.open();
  }
});
loadProfile();

/* Отличная работа! Но нужно поправить, чтобы попап редактирования профиля при сохранении 
данных закрывался только после того как данные успешно отправлены на сервер  */
