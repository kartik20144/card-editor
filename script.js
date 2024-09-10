document.addEventListener("DOMContentLoaded", function () {
  let selectedTextElement = null;

  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  document.getElementById("addTextBtn").addEventListener("click", function () {
    const fontSize = document.getElementById("fontSize").value;
    const fontType = document.getElementById("fontType").value;
    const fontColor = document.getElementById("fontColor").value;

    const card = document.querySelector(".swiper-slide-active .card-content");
    const textElement = document.createElement("div");

    textElement.classList.add("draggable-text");
    textElement.style.fontSize = fontSize + "px";
    textElement.style.fontFamily = fontType;
    textElement.style.color = fontColor;
    textElement.textContent = "New Text";
    textElement.contentEditable = true;

    makeTextDraggable(textElement);

    card.appendChild(textElement);

    textElement.focus();

    selectedTextElement = textElement;

    textElement.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.execCommand("insertHTML", false, "<br><br>");
      }
    });
  });

  function applyStyleToSelectedText(command, value) {
    if (selectedTextElement && document.getSelection().rangeCount > 0) {
      document.execCommand(command, false, value);
    }
  }

  document.getElementById("fontSize").addEventListener("change", function () {
    applyStyleToSelectedText(
      "fontSize",
      document.getElementById("fontSize").value
    );
  });

  document.getElementById("fontType").addEventListener("change", function () {
    applyStyleToSelectedText(
      "fontName",
      document.getElementById("fontType").value
    );
  });

  document.getElementById("fontColor").addEventListener("input", function () {
    applyStyleToSelectedText(
      "foreColor",
      document.getElementById("fontColor").value
    );
  });

  function makeTextDraggable(textElement) {
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY;

    textElement.addEventListener("focus", function () {
      textElement.style.resize = "both";
    });

    textElement.addEventListener("mousedown", function (e) {
      const isResizingCorner =
        e.target === textElement &&
        e.offsetX >= textElement.clientWidth - 10 &&
        e.offsetY >= textElement.clientHeight - 10;

      if (isResizingCorner) {
        isResizing = true;
      } else {
        isDragging = true;
        offsetX = e.clientX - textElement.getBoundingClientRect().left;
        offsetY = e.clientY - textElement.getBoundingClientRect().top;
        textElement.style.zIndex = 1000;
      }

      selectedTextElement = textElement;
    });

    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        const swiperContainer = document.querySelector(".swiper-container");
        const card = document.querySelector(
          ".swiper-slide-active .card-content"
        );

        let newX =
          e.clientX - offsetX - swiperContainer.getBoundingClientRect().left;
        let newY =
          e.clientY - offsetY - swiperContainer.getBoundingClientRect().top;

        const swiperRect = swiperContainer.getBoundingClientRect();
        const textRect = textElement.getBoundingClientRect();

        if (newX < 0) newX = 0;
        if (newX + textRect.width > swiperRect.width)
          newX = swiperRect.width - textRect.width;
        if (newY < 0) newY = 0;
        if (newY + textRect.height > swiperRect.height)
          newY = swiperRect.height - textRect.height;

        textElement.style.left = newX + "px";
        textElement.style.top = newY + "px";
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
      isResizing = false;
      textElement.style.zIndex = "";
    });

    textElement.addEventListener("blur", function () {
      textElement.style.resize = "none";
    });
  }

  document.addEventListener("focusin", function (e) {
    if (e.target.classList.contains("draggable-text")) {
      swiper.allowTouchMove = false;
      selectedTextElement = e.target;
    }
  });

  document.addEventListener("focusout", function (e) {
    if (e.target.classList.contains("draggable-text")) {
      swiper.allowTouchMove = true;
    }
  });
});
