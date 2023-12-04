const modals = () => {
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
      widthInput = document.getElementById("width"),
      heightInput = document.getElementById("height"),
      headerWarning = document.getElementById("choose"),
      scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("popup_calc_button")) {
          e.preventDefault();
          if (widthInput.value !== "" && heightInput.value !== "") {
            windows.forEach((item) => {
              item.style.display = "none";
            });

            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;

            headerWarning.classList.remove("warning");
            firstButton.classList.remove("disabled");
          } else {
            widthInput.classList.add("error");
            heightInput.classList.add("error");
            headerWarning.classList.add("warning");
            firstButton.classList.add("disabled");
          }
        } else {
          e.preventDefault();
          windows.forEach((item) => {
            item.style.display = "none";
          });

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`;
        }

        widthInput.addEventListener("input", resetErrorColor);
        heightInput.addEventListener("input", resetErrorColor);

        function resetErrorColor() {
          widthInput.classList.remove("error");
          heightInput.classList.remove("error");
          headerWarning.classList.remove("warning");
          firstButton.classList.remove("disabled");
        }
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
      //   document.body.classList.remove("modal-open");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        // document.body.classList.remove("modal-open");
      }
    });
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
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
};

export default modals;
