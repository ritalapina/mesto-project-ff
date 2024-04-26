// Открытие попапа
function openPopup(item) {
  item.classList.add("popup_is-animated");
  setTimeout(() => {
    item.classList.add("popup_is-opened");
  }, 1);
  document.addEventListener("keydown", closeByEscape);
}

// Закрытие попапа
function closePopup(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const item = document.querySelector(".popup_is-opened");
    closePopup(item);
  }
}

export { openPopup, closePopup, closeByEscape };
