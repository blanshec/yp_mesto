const createElementWithClass = (assignedTag, assignedClass) => {
  const newElement = document.createElement(assignedTag);
  newElement.classList.add(assignedClass);
  return newElement;
};
const disableSubmitButton = button => {
  button.setAttribute("disabled", true);
  button.classList.add(".popup__button_disabled");
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

export { validateInput };
