(()=>{"use strict";function e(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function o(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}var a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-11",headers:{authorization:"ad900760-8f0e-4af1-af59-d2a107a38940","Content-Type":"application/json"}};function c(e,t){var n="".concat(i.baseUrl).concat(e);return fetch(n,t).then(r)}var u=document.querySelector(".popup_type_confirm_delete");function l(e,t,n){var r=t.handleDeleteButton,o=t.clickLike,a=t.handleImageClick,u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__title"),s=u.querySelector(".card__like-button"),d=u.querySelector(".card__image"),p=u.querySelector(".card__like-counter"),f=u.querySelector(".card__delete-button");return l.textContent=e.name,d.src=e.link,d.alt=e.name,p.textContent=e.likes.length,e.owner._id!==n?(f.disabled=!0,f.classList.add("visually-hidden")):f.addEventListener("click",(function(){r(e._id,u)})),e.likes.some((function(e){return e._id===n}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(t){var n;s.classList.contains("card__like-button_is-active")?(n=e._id,c("/cards/likes/".concat(n),{method:"DELETE",headers:i.headers})).then((function(e){o(t),p.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return c("/cards/likes/".concat(e),{method:"PUT",headers:i.headers})}(e._id).then((function(e){o(t),p.textContent=e.likes.length})).catch((function(e){console.log(e)}))})),d.addEventListener("click",(function(){return a(e)})),u}function s(e){e.target.classList.toggle("card__like-button_is-active")}function d(e,t,n){var r=n.inputErrorClass,o=n.errorClass,a=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),a.classList.remove(o),a.textContent=""}document.forms["delete-card"];var p=function(e,t,n){var r=n.inactiveButtonClass;t&&(function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!0,t.classList.add(r)):(t.classList.remove(r),t.disabled=!1))};function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t.inputErrorClass,t.errorClass)})),p(n,r,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".places__list"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),C=document.forms["edit-profile"],g=C.name,E=C.description,k=(document.querySelector(".card__delete-button"),document.querySelector(".popup_type_new-card")),L=document.querySelector(".profile__add-button"),q=document.forms["new-place"],A=q["place-name"],x=q.link,B=document.querySelector(".popup_type_image"),w=B.querySelector(".popup__image"),D=B.querySelector(".popup__caption"),T=document.querySelector(".popup_type_avatar_edit"),j=document.querySelector(".profile__avatar-button"),I=document.forms["edit-avatar"],O=I.avatar,P=document.querySelector(".popup_type_confirm_delete"),M=document.forms["delete-card"],N=document.querySelectorAll(".popup");document.querySelectorAll(".popup__close"),Promise.all([c("/users/me",{headers:i.headers}),c("/cards",{headers:i.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1],i=o._id;h.textContent=o.name,b.textContent=o.about,S.style="background-image: url('".concat(o.avatar,"')"),a.forEach((function(e){v.append(l(e,{handleDeleteButton:K,clickLike:s,handleImageClick:Q},i))}))})).catch((function(e){console.log(e)})),y.addEventListener("click",(function(){e(_),f(_,a),g.value=h.textContent,E.value=b.textContent})),C.addEventListener("submit",(function(e){var n,r,a;e.preventDefault(),o(!0,e.submitter),(n={name:g.value,about:E.value},r=n.name,a=n.about,c("/users/me",{method:"PATCH",headers:i.headers,body:JSON.stringify({name:r,about:a})})).then((function(e){h.textContent=e.name,b.textContent=e.about,t(_)})).catch((function(e){console.log(e)})).finally((function(){o(!1,e.submitter)}))})),L.addEventListener("click",(function(){e(k),q.reset(),f(k,a)})),q.addEventListener("submit",(function(e){var n,r,a;e.preventDefault(),o(!0,e.submitter),(n={name:A.value,link:x.value},r=n.name,a=n.link,c("/cards",{method:"POST",headers:i.headers,body:JSON.stringify({name:r,link:a})})).then((function(e){v.prepend(l(e,{handleDeleteButton:K,clickLike:s,handleImageClick:Q},e.owner._id)),q.reset(),t(k)})).catch((function(e){console.log(e)})).finally((function(){o(!1,e.submitter)}))})),j.addEventListener("click",(function(){e(T),I.reset(),f(T,a)})),I.addEventListener("submit",(function(e){var n;e.preventDefault(),o(!0,e.submitter),(n=O.value,c("/users/me/avatar",{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:n})})).then((function(e){S.style="background-image: url('".concat(e.avatar,"')"),t(T)})).catch((function(e){console.log(e)})).finally((function(){o(!1,e.submitter)}))}));var U,J,H,V,z,$,F,G={},K=function(t,n){e(P),G._id=t,G.cardItem=n};function Q(t){!function(e){w.src=e.link,w.alt=e.name,D.textContent=e.name}(t),e(B)}M.addEventListener("submit",(function(e){var n,r;e.preventDefault(),n=G._id,r=G.cardItem,function(e){return c("/cards/".concat(e),{method:"DELETE",headers:i.headers})}(n).then((function(){r.remove(),t(u)})).catch((function(e){console.log(e)}))})),N.forEach((function(e){e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup_opened")&&(t(e),f(e,a)),n.target.classList.contains("popup__close")&&(t(e),f(e,a)),n.target===n.currentTarget&&(t(e),f(e,a))}))})),J=(U=a).formSelector,H=U.inputSelector,V=U.submitButtonSelector,z=U.inactiveButtonClass,$=U.inputErrorClass,F=U.errorClass,Array.from(document.querySelectorAll(J)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=t.inputSelector,r=t.submitButtonSelector,o=t.inactiveButtonClass,a=t.inputErrorClass,i=t.errorClass,c=Array.from(e.querySelectorAll(n)),u=e.querySelector(r);p(c,u,{inactiveButtonClass:o}),c.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n){var r=n.inputErrorClass,o=n.errorClass;t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,{inputErrorClass:r,errorClass:o}):function(e,t,n,r){var o=r.inputErrorClass,a=r.errorClass,i=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),i.textContent=n,i.classList.add(a)}(e,t,t.validationMessage,{inputErrorClass:r,errorClass:o})}(e,t,{inputErrorClass:a,errorClass:i}),p(c,u,{inactiveButtonClass:o})}))}))}(e,{inputSelector:H,submitButtonSelector:V,inactiveButtonClass:z,inputErrorClass:$,errorClass:F})}))})();