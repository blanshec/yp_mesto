import { api } from "../../scripts/script";

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
loadProfile();
export { insertUserDataToInput, updateProfileInfo };
