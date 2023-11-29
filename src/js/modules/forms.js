import checkNumInputs from "./checkNumInputs";
import clearForm from "./clearForm";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    windows = document.querySelectorAll("[data-modal]");

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });

    clearForm();
  };

  const clearState = (stateObj) => {
    for (let key in stateObj) {
      stateObj[key] = "";
    }
  };

  function closeModal() {
    windows.forEach((item) => {
      item.style.display = "none";
    });
    document.body.style.overflow = "";
  }

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if (item.getAttribute("data-calc") === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          console.log(state);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs();
          clearState(state);
          setTimeout(() => {
            statusMessage.remove();
            closeModal();
          }, 5000);
        });
    });
  });
};

export default forms;
