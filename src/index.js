import "./pages/index.css";
// import { initialCards } from './cards.js';
import { closePopup, openPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getInitialCards,
  patchUserInfo,
  addCard,
  likeCard,
  deleteLikeCard,
  updateAvatar,
} from "./api";
import { createCard, deleteCard, clickLike } from "./components/card.js";

//Выводим все карточки из массива на страницу
const cardContainer = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
// initialCards.forEach(function(card) {
//   cardContainer.append(createCard, deleteCard, clickLike, handleImageClick);
// });

//Модальные окна
const popupEditProfile = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");

//Редактрование профиля
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const formEditElement = document.forms["edit-profile"];
const nameInput = formEditElement["name"];
const jobInput = formEditElement["description"];
const deleteButton = document.querySelector(".card__delete-button");

const popupNewCard = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const formNewCard = document.forms["new-place"];
const placeInput = formNewCard["place-name"];
const linkInput = formNewCard["link"];

const popupImage = document.querySelector(".popup_type_image");
const popupImageData = popupImage.querySelector(".popup__image");
const popupImageDescription = popupImage.querySelector(".popup__caption");

const popupAvatar = document.querySelector(".popup_type_avatar_edit");
const editAvatarButton = document.querySelector(".profile__avatar-button");
const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar["avatar"];

const popupConfirmDelete = document.querySelector(".popup_type_confirm-delete");

const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Выводим информацию о пользователе
getUserInfo()
  .then((user) => {
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileImage.style = `background-image: url('${user.avatar}')`;
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    cards.forEach((card) => {
      cardContainer.append(
        createCard(
          card,
          { deleteCard, clickLike, handleImageClick, closePopup, openPopup },
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Открываем попап и заполняем
editProfileButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//Обработчик события формы Edit
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  patchUserInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileSubtitle.textContent = userData.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

//Слушатель на submit
formEditElement.addEventListener("submit", handleFormEditSubmit);

//Открываем попап newCard
addCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
  placeInput.value = "";
  linkInput.value = "";
  clearValidation(popupNewCard, validationConfig);
});

//Обработчик события формы newCard
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);

  addCard({
    name: placeInput.value,
    link: linkInput.value,
  })
    .then((cardData) => {
      cardContainer.prepend(
        createCard(
          cardData,
          { deleteCard, clickLike, handleImageClick, closePopup, openPopup },
          cardData.owner._id
        )
      );
      clearValidation(popupNewCard, validationConfig);
      formNewCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

//Слушатель на submit
formNewCard.addEventListener("submit", addNewCard);

//Открываем попап аватар
editAvatarButton.addEventListener("click", function () {
  openPopup(popupAvatar);
  avatarInput.value = "";
  clearValidation(popupAvatar, validationConfig);
});

formEditAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true);
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style = `background-image: url('${userData.avatar}')`;
      closePopup(popupAvatar);
    })
    .finally(() => {
      renderLoading(false);
    });
});

//Увеличиваем картинку
function handleImageClick(cardData) {
  setImageData(cardData);
  openPopup(popupImage);
}

//Присваиваем значение картинке
function setImageData(cardData) {
  popupImageData.src = cardData.link;
  popupImageData.alt = cardData.name;
  popupImageDescription.textContent = cardData.name;
}

// Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
      clearValidation(popup, validationConfig);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
      clearValidation(popup, validationConfig);
    }
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
      clearValidation(popup, validationConfig);
    }
  });
});

function renderLoading(isLoading) {
  const activePopup = document.querySelector(".popup_is-opened");
  if (activePopup) {
    const activeButton = activePopup.querySelector(".popup__button");
    if (isLoading) {
      activeButton.textContent = "Сохранение...";
    } else {
      activeButton.textContent = "Сохранить";
    }
  }
}

enableValidation(validationConfig);
