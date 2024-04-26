import "./pages/index.css";
// import { initialCards } from './cards.js';
import { createCard, deleteCard, clickLike } from "./components/card.js";
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
import { validationConfig, renderLoading } from "./utils/utils";

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

const popupConfirmDelete = document.querySelector(".popup_type_confirm_delete");
const formDeleteCard = document.forms["delete-card"];

const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close");

// Выводим информацию о пользователе
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;

    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    profileImage.style = `background-image: url('${userData.avatar}')`;

    cards.forEach((card) => {
      cardContainer.append(
        createCard(
          card,
          {
            handleDeleteButton: handleDeleteButton,
            clickLike,
            handleImageClick,
          },
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
  clearValidation(popupEditProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//Обработчик события формы Edit
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

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
      renderLoading(false, evt.submitter);
    });
}

//Слушатель на submit
formEditElement.addEventListener("submit", handleFormEditSubmit);

//Открываем попап newCard
addCardButton.addEventListener("click", function () {
  openPopup(popupNewCard);
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
});

//Обработчик события формы newCard
function addNewCard(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  addCard({
    name: placeInput.value,
    link: linkInput.value,
  })
    .then((cardData) => {
      cardContainer.prepend(
        createCard(
          cardData,
          {
            handleDeleteButton: handleDeleteButton,
            clickLike,
            handleImageClick,
          },
          cardData.owner._id
        )
      );
      formNewCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

//Слушатель на submit
formNewCard.addEventListener("submit", addNewCard);

//Открыть попап avatar
editAvatarButton.addEventListener("click", function () {
  openPopup(popupAvatar);
  formEditAvatar.reset();
  clearValidation(popupAvatar, validationConfig);
});

formEditAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileImage.style = `background-image: url('${userData.avatar}')`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
});

const cardData = {};

const handleDeleteButton = (cardId, cardItem) => {
  openPopup(popupConfirmDelete);
  cardData._id = cardId;
  cardData.cardItem = cardItem;
};

formDeleteCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(cardData._id, cardData.cardItem);
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

enableValidation(validationConfig);
