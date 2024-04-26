function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
}

function setEventListeners(
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, { inactiveButtonClass });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, {
        inputErrorClass,
        errorClass,
      });
      toggleButtonState(inputList, buttonElement, { inactiveButtonClass });
    });
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {
      inputErrorClass,
      errorClass,
    });
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
};

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      profileForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

export { enableValidation, clearValidation };
