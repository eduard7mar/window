const clearForm = () => {
  const windowTab = document.querySelectorAll(".balcon_icons_img"),
        windowContent = document.querySelectorAll(".big_img > img"),
        windowType = document.querySelector("#view_type"),
        windowProfile = document.querySelectorAll(".checkbox");

  const clearWindow = () => {
    windowContent.forEach((item) => {
      item.style.display = "none";
    });
    windowTab.forEach((item) => {
      item.classList.remove("do_image_more");
    });

    windowContent[0].style.display = "inline-block";
    windowTab[0].classList.add("do_image_more");
    
    windowType.value = "tree";
  };

  clearWindow();
};

export default clearForm;
