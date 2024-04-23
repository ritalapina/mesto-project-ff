import { deleteOwnerCard, likeCard, deleteLikeCard } from "../api";

const popupConfirmDelete = document.querySelector(".popup_type_confirm_delete");

export function createCard(
  cardData,
  { deleteCard, clickLike, handleImageClick, closePopup, openPopup },
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardItem.querySelector(".card__title");
  const cardImage = cardItem.querySelector(".card__image");

  const cardLikeCounter = cardItem.querySelector(".card__like-counter");
  const popupConfirmDelete = document.querySelector(
    ".popup_type_confirm_delete"
  );
  const formDeleteCard = document.forms["delete-card"];

  // @todo: DOM узлы
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  const deleteButton = cardItem.querySelector(".card__delete-button");

  if (cardData.owner._id !== userId) {
    deleteButton.disabled = true;
    deleteButton.classList.add("visually-hidden");
  }

  const likeButton = cardItem.querySelector(".card__like-button");

  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", function () {
    if (!deleteButton.disabled) {
      openPopup(popupConfirmDelete);
      formDeleteCard.addEventListener("submit", function (evt) {
        evt.preventDefault();
        deleteCard(cardItem, cardData._id, closePopup);
      });
    }
  });

  likeButton.addEventListener("click", (evt) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      deleteLikeCard(cardData._id)
        .then((res) => {
          clickLike(evt);
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeCard(cardData._id)
        .then((res) => {
          clickLike(evt);
          cardLikeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  // Функция создания карточки
  return cardItem;
}

// @todo: Функция удаления карточки
//debugger
export function deleteCard(cardItem, cardId, closePopup) {
  deleteOwnerCard(cardId)
    .then(() => {
      cardItem.remove();
      closePopup(popupConfirmDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Обработчик лайка
export function clickLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
