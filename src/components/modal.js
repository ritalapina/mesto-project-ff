// Открытие попапа 
function openPopup(popup) {
    popup.classList.add('popup_is-animated', 'popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
  };
  
  // Закрытие попапа 
  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
  };
  
  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened'); 
      closePopup(popup);
    }
  };
  
  // Закрытие попапа на оверлей
  const PopupOverlay = document.querySelectorAll('.popup');
  
  PopupOverlay.forEach((popup) => {
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
  
  export {openPopup, closePopup, closeByEscape};