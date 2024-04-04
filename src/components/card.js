
const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

  function createCard(cardData, deleteCard, likeCard, handleImageClick) {
  // @todo: Темплейт карточки
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  // @todo: DOM узлы
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
    
  deleteButton.addEventListener('click', function() {
    deleteCard(cardItem);
  });

  likeButton.addEventListener('click', likeCard);
  
  cardImage.addEventListener('click', function () {
    handleImageClick(cardData);
});

  // Функция создания карточки
  return cardItem; 
}
  
// Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}

//Обработчик лайка
  function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard}