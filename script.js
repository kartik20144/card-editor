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
    const textElement = document.createElement("p");

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
    if (selectedTextElement) {
      if (command === "fontSize") {
        selectedTextElement.style.fontSize = value + "px";
      } else if (command === "fontName") {
        selectedTextElement.style.fontFamily = value;
      } else if (command === "foreColor") {
        selectedTextElement.style.color = value;
      }
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
    let offsetX, offsetY;

    textElement.addEventListener("mousedown", function (e) {
      isDragging = true;
      offsetX = e.clientX - textElement.getBoundingClientRect().left;
      offsetY = e.clientY - textElement.getBoundingClientRect().top;
      textElement.style.zIndex = 1000;
      selectedTextElement = textElement;
    });

    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        const swiperContainer = document.querySelector(".swiper-container");
        const card = document.querySelector(".swiper-slide-active .card-content");

        let newX =
          e.clientX - offsetX - swiperContainer.getBoundingClientRect().left;
        let newY =
          e.clientY - offsetY - swiperContainer.getBoundingClientRect().top;

        const swiperRect = swiperContainer.getBoundingClientRect();
        const textRect = textElement.getBoundingClientRect();

        // Adjust boundaries to fit within the swiper container
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
      textElement.style.zIndex = "";
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

  const customizePagesBtn = document.getElementById("customizePagesBtn");
  const customizePagesModal = document.getElementById("customizePagesModal");
  const pagesList = document.getElementById("pagesList");
  const savePagesBtn = document.getElementById("savePagesBtn");
  const cancelPagesBtn = document.getElementById("cancelPagesBtn");

  let draggedItem = null;

  // Function to open the modal and display the slide previews
  customizePagesBtn.addEventListener("click", function () {
    pagesList.innerHTML = "";

    const slides = document.querySelectorAll(".swiper-slide");

    slides.forEach((slide, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("draggable", true);
      listItem.dataset.index = index;

      const imgSrc = slide.querySelector("img").src;

      const imgPreview = document.createElement("img");
      imgPreview.src = imgSrc;
      imgPreview.style.width = "50px";
      imgPreview.style.height = "auto";
      imgPreview.alt = `Slide ${index + 1} preview`;

      listItem.appendChild(imgPreview);
      pagesList.appendChild(listItem);

      listItem.addEventListener("dragstart", function () {
        draggedItem = listItem;
        listItem.style.opacity = 0.5;
      });

      listItem.addEventListener("dragend", function () {
        listItem.style.opacity = "";
      });

      listItem.addEventListener("dragover", function (e) {
        e.preventDefault();
      });

      listItem.addEventListener("drop", function () {
        if (draggedItem !== this) {
          let draggedIndex = draggedItem.dataset.index;
          let currentIndex = this.dataset.index;
          this.parentNode.insertBefore(draggedItem, this);
        }
      });
    });

    customizePagesModal.style.display = "flex";
  });

  savePagesBtn.addEventListener("click", function () {
    const newOrder = [];

    const reorderedItems = pagesList.querySelectorAll("li");

    reorderedItems.forEach((item) => {
      newOrder.push(item.dataset.index);
    });

    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const slides = Array.from(swiperWrapper.children);

    newOrder.forEach((newIndex) => {
      swiperWrapper.appendChild(slides[newIndex]);
    });

    customizePagesModal.style.display = "none";
  });

  cancelPagesBtn.addEventListener("click", function () {
    customizePagesModal.style.display = "none";
  });
});
