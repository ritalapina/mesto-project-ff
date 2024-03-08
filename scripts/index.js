
const mainContent= document.querySelector('.content');
const cardContainer = document.querySelector('.places__list');

//  Функция создания карточки
function createCard(dataCard, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = dataCard;
  cardElement.querySelector('.card__image').src = cardLink;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });
  
  return cardElement; 
}

//  Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(function(card) {
  cardContainer.append(createCard(card.data, card.link));
});