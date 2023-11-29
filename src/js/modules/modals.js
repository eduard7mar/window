const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"); //получить доступ ко всем модальным окнам с помощью data atribut

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault(); //проверим наличие тригера, и если это ссылка отменяем действие браузера
        }

        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; //отменяем скролл страницы при открытии модального окна
        //   document.body.classList.add("modal-open");

        // document.querySelector(".popup_calc_button").style.opacity = 0.5;
        // document.querySelector(".popup_calc_profile_button").style.opacity = 0.5;

        // if (item.classList.contains("popup_calc_button") || item.classList.contains("popup_calc_profile_button")) {
        //   item.disabled = true;
        // } 
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
        windows.forEach(item => {
            item.style.display = "none";
        })

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
  bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
  bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);
  //   showModalByTime(".popup", 60000);
};

export default modals;
