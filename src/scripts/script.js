export { api } from "./api";

import Popup from "../blocks/popup/popup.js";
import PopupImage from "../blocks/popup/popupImage.js";
import CardList from "../blocks/places-list/cardList.js";
import { validateInput } from "../blocks/popup/__form/formValidation";
import { insertUserDataToInput } from "../blocks/profile/profile";

const placesList = document.querySelector(".places-list");
new CardList(placesList);

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
