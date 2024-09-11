// document.addEventListener("DOMContentLoaded", function () {
//   let selectedTextElement = null;

//   var swiper = new Swiper(".swiper-container", {
//     slidesPerView: 1,
//     spaceBetween: 0,
//     loop: false,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });

//   document.getElementById("addTextBtn").addEventListener("click", function () {
//     const fontSize = document.getElementById("fontSize").value;
//     const fontType = document.getElementById("fontType").value;
//     const fontColor = document.getElementById("fontColor").value;

//     const card = document.querySelector(".swiper-slide-active .card-content");
//     const textElement = document.createElement("div");

//     textElement.classList.add("draggable-text");
//     textElement.style.fontSize = fontSize + "px";
//     textElement.style.fontFamily = fontType;
//     textElement.style.color = fontColor;
//     textElement.textContent = "New Text";
//     textElement.contentEditable = true;

//     makeTextDraggable(textElement);

//     card.appendChild(textElement);

//     textElement.focus();

//     selectedTextElement = textElement;

//     textElement.addEventListener("keydown", function (e) {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         document.execCommand("insertHTML", false, "<br><br>");
//       }
//     });
//   });

//   function applyStyleToSelectedText(command, value) {
//     if (selectedTextElement && document.getSelection().rangeCount > 0) {
//       document.execCommand(command, false, value);
//     }
//   }

//   document.getElementById("fontSize").addEventListener("change", function () {
//     applyStyleToSelectedText(
//       "fontSize",
//       document.getElementById("fontSize").value
//     );
//   });

//   document.getElementById("fontType").addEventListener("change", function () {
//     applyStyleToSelectedText(
//       "fontName",
//       document.getElementById("fontType").value
//     );
//   });

//   document.getElementById("fontColor").addEventListener("input", function () {
//     applyStyleToSelectedText(
//       "foreColor",
//       document.getElementById("fontColor").value
//     );
//   });

//   function makeTextDraggable(textElement) {
//     let isDragging = false;
//     let isResizing = false;
//     let offsetX, offsetY;

//     textElement.addEventListener("focus", function () {
//       textElement.style.resize = "both";
//     });

//     textElement.addEventListener("mousedown", function (e) {
//       const isResizingCorner =
//         e.target === textElement &&
//         e.offsetX >= textElement.clientWidth - 10 &&
//         e.offsetY >= textElement.clientHeight - 10;

//       if (isResizingCorner) {
//         isResizing = true;
//       } else {
//         isDragging = true;
//         offsetX = e.clientX - textElement.getBoundingClientRect().left;
//         offsetY = e.clientY - textElement.getBoundingClientRect().top;
//         textElement.style.zIndex = 1000;
//       }

//       selectedTextElement = textElement;
//     });

//     document.addEventListener("mousemove", function (e) {
//       if (isDragging) {
//         const swiperContainer = document.querySelector(".swiper-container");
//         const card = document.querySelector(
//           ".swiper-slide-active .card-content"
//         );

//         let newX =
//           e.clientX - offsetX - swiperContainer.getBoundingClientRect().left;
//         let newY =
//           e.clientY - offsetY - swiperContainer.getBoundingClientRect().top;

//         const swiperRect = swiperContainer.getBoundingClientRect();
//         const textRect = textElement.getBoundingClientRect();

//         if (newX < 0) newX = 0;
//         if (newX + textRect.width > swiperRect.width)
//           newX = swiperRect.width - textRect.width;
//         if (newY < 0) newY = 0;
//         if (newY + textRect.height > swiperRect.height)
//           newY = swiperRect.height - textRect.height;

//         textElement.style.left = newX + "px";
//         textElement.style.top = newY + "px";
//       }
//     });

//     document.addEventListener("mouseup", function () {
//       isDragging = false;
//       isResizing = false;
//       textElement.style.zIndex = "";
//     });

//     textElement.addEventListener("blur", function () {
//       textElement.style.resize = "none";
//     });
//   }

//   document.addEventListener("focusin", function (e) {
//     if (e.target.classList.contains("draggable-text")) {
//       swiper.allowTouchMove = false;
//       selectedTextElement = e.target;
//     }
//   });

//   document.addEventListener("focusout", function (e) {
//     if (e.target.classList.contains("draggable-text")) {
//       swiper.allowTouchMove = true;
//     }
//   });
// });
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

  // This will apply style to the whole p element rather than the selected text
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


const pages = Array.from(document.querySelectorAll(".swiper-slide"));

const customizePagesBtn = document.getElementById("customizePagesBtn");
const customizePagesModal = document.getElementById("customizePagesModal");
const pagesList = document.getElementById("pagesList");
const savePagesBtn = document.getElementById("savePagesBtn");
const cancelPagesBtn = document.getElementById("cancelPagesBtn");

customizePagesBtn.addEventListener("click", function () {
  pagesList.innerHTML = ""; // Clear previous list
  pages.forEach((page, index) => {
    const li = document.createElement("li");
    li.textContent = `Page ${index + 1}`;
    li.draggable = true;
    li.dataset.index = index;
    pagesList.appendChild(li);
  });
  customizePagesModal.style.display = "flex";
});

savePagesBtn.addEventListener("click", function () {
  const newOrder = Array.from(pagesList.children).map(li => parseInt(li.dataset.index));
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  // Reorder pages in the DOM
  newOrder.forEach((index, newIndex) => {
    const page = pages[index];
    swiperWrapper.appendChild(page); // Reappends page to reorder
  });

  // Update pages array with the new order
  pages.length = 0; // Clear the existing array
  pages.push(...Array.from(swiperWrapper.children)); // Populate with new order

  customizePagesModal.style.display = "none";
  swiper.update(); // Update Swiper after reordering
});

cancelPagesBtn.addEventListener("click", function () {
  customizePagesModal.style.display = "none";
});

// Drag and Drop functionality
pagesList.addEventListener("dragstart", function (e) {
  e.target.classList.add("dragging");
});

pagesList.addEventListener("dragend", function (e) {
  e.target.classList.remove("dragging");
});

pagesList.addEventListener("dragover", function (e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(pagesList, e.clientY);
  const dragging = document.querySelector(".dragging");
  if (afterElement == null) {
    pagesList.appendChild(dragging);
  } else {
    pagesList.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
