
const mainContent= document.querySelector('.content');
const cardContainer = document.querySelector('.places__list');


function createCard(listItem, deleteHandler) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = listItem.name;
  cardElement.querySelector('.card__image').src = listItem.link;
  cardElement.querySelector('.card__image').alt = listItem.name;
  
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
 
  deleteButton.addEventListener('click', function () {
    deleteHandler(cardElement);
  });
  
  return cardElement; 
}

function deleteCard(cardElement) {
    cardElement.remove();
}

initialCards.forEach(function(card) {
  cardContainer.append(createCard(card, deleteCard));
});