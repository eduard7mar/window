const modals = (state) => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      firstButton = document.querySelector(".popup_calc_button"),
      secondButton = document.querySelector(".popup_calc_profile_button"),
      widthInput = document.getElementById("width"),
      heightInput = document.getElementById("height");

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        if (!state.width && !state.height) {
          firstButton.disabled = true;
          firstButton.style.opacity = 0.5;
          widthInput.style.border = "1px solid red";
          heightInput.style.border = "1px solid red";
        } else {
          firstButton.disabled = false;
          firstButton.style.opacity = 1;
          widthInput.style.border = "1px solid #ccc";
          heightInput.style.border = "1px solid red";
        }

        // function handleInputBlur(event) {
        //   let input = event.target;
        //   if (!input.value) {
        //     input.classList.add('invalid');
        //   }
        // }
        
        // function handleInputFocus(event) {
        //   let input = event.target;
        //   if (input.classList.contains('invalid')) {
        //     input.classList.remove('invalid');
        //   }
        // }
        
        // widthInput.addEventListener('blur', handleInputBlur);
        // widthInput.addEventListener('focus', handleInputFocus);
        
        // heightInput.addEventListener('blur', handleInputBlur);
        // heightInput.addEventListener('focus', handleInputFocus);


        // if (state.profile) {
        //   secondButton.disabled = false;
        //   secondButton.style.opacity = 1;
        // } else {
        //   secondButton.disabled = true;
        //   secondButton.style.opacity = 0.5;
        // }

        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      //   document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      // клик на подложку и закрытие модального окна
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        // document.body.classList.remove("modal-open");
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false
  );
  //   showModalByTime(".popup", 60000);
};

export default modals;
