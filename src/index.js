
import './pages/index.css';
import { initialCards } from './cards.js';
import { closePopup, openPopup } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';

const mainContent= document.querySelector('.content');

//Выводим все карточки из массива на страницу
const cardContainer = document.querySelector('.places__list');

initialCards.forEach(function(card) {
  cardContainer.append(createCard(card, deleteCard, likeCard, handleImageClick));
});

//Модальные окна
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile  = document.querySelector('.popup_type_edit');

//Редактрование профиля 
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__description');

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement['name'];
const jobInput = formEditElement['description'];

const popupNewCard = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard['link'];

const popupImage = document.querySelector('.popup_type_image');
const popupImageData = popupImage.querySelector('.popup__image');
const popupImageDescription = popupImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

//Редактирование и заполнение
editProfileButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile );
});

function handleFormEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//Слушатель на submit 
formEditElement.addEventListener('submit', handleFormEditSubmit);

//Открываем попап newCard
addCardButton.addEventListener('click', function() {
  openPopup(popupNewCard);
})

function addNewCard(event) {
  event.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: linkInput.value
  };
  cardContainer.prepend(createCard(newCard, deleteCard, likeCard, handleImageClick));
  formNewCard.reset();
  closePopup(popupNewCard);
}
  
//Слушатель на submit 
formNewCard.addEventListener('submit', addNewCard);

//Увеличиваем картинку
function handleImageClick(cardData) {
  setImageData(cardData);
  openPopup(popupImage)
}

//Присваиваем значение картинке 
function setImageData(cardData) {
  popupImageData.src = cardData.link;
  popupImageData.alt = cardData.name;
  popupImageDescription.textContent = cardData.name;
}

 // Закрытие попапов на оверлей
 popups.forEach((popup) => {
     popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup_opened')) {
             closePopup(popup)
         }
         if (evt.target.classList.contains('popup__close')) {
           closePopup(popup)
         }
     
         if (evt.currentTarget ===evt.target) {
           closePopup(popup);
         }
     })
 }) 











