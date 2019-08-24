export { api } from "./api";
import Popup from "../blocks/popup/popup.js";
import PopupImage from "../blocks/popup/popupImage.js";
import CardList from "../blocks/places-list/cardList.js";
import ProfileManager from "../blocks/profile/profile";
import { listenToValidateInput } from "../blocks/popup/__form/formValidation";

export const cards = new CardList(document.querySelector(".places-list"));
export const profile = new ProfileManager();
profile.loadProfile();

//forms
listenToValidateInput();
document.querySelector(".profile").addEventListener("click", () => {
  if (event.target.classList.contains("user-info__button")) {
    const popup = new Popup("popup_new-card");
    popup.open();
  } else if (event.target.classList.contains("user-info__button_edit")) {
    const popup = new Popup("popup_edit-profile");
    popup.open();
    profile.insertUserDataToInput(popup.popupElement);
  }
});
document.querySelector(".places-list").addEventListener("click", () => {
  if (event.target.classList.contains("place-card__image")) {
    const popup = new PopupImage(event.target);
    popup.open();
  }
});
