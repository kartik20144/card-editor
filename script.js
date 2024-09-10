document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  
    // Handle adding text to the card
    document.getElementById('addTextBtn').addEventListener('click', function() {
      const fontSize = document.getElementById('fontSize').value;
      const fontType = document.getElementById('fontType').value;
      const fontColor = document.getElementById('fontColor').value;
  
      const card = document.querySelector('.swiper-slide-active .card-content');
      const textElement = document.createElement('div');
  
      textElement.classList.add('draggable-text');
      textElement.style.fontSize = fontSize + 'px';
      textElement.style.fontFamily = fontType;
      textElement.style.color = fontColor;
      textElement.textContent = 'New Text';
      textElement.contentEditable = true; // Make the text content editable
  
      // Add draggable behavior
      makeTextDraggable(textElement);
  
      // Add the text element to the card
      card.appendChild(textElement);
  
      // Focus the new text element to start typing immediately
      textElement.focus();
  
      // Handle Enter key to add a new line
      textElement.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault(); // Prevent default behavior (e.g., adding a new <div> or <p>)
          document.execCommand('insertHTML', false, '<br><br>'); // Insert a line break
        }
      });
    });
  
    // Make the text draggable and limit it within the swiper container
    function makeTextDraggable(textElement) {
      let isDragging = false;
      let offsetX, offsetY;
  
      textElement.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - textElement.getBoundingClientRect().left;
        offsetY = e.clientY - textElement.getBoundingClientRect().top;
        textElement.style.zIndex = 1000; // Bring to front while dragging
      });
  
      document.addEventListener('mousemove', function(e) {
        if (isDragging) {
          const swiperContainer = document.querySelector('.swiper-container');
          const card = document.querySelector('.swiper-slide-active .card-content');
  
          let newX = e.clientX - offsetX - swiperContainer.getBoundingClientRect().left;
          let newY = e.clientY - offsetY - swiperContainer.getBoundingClientRect().top;
  
          // Prevent dragging outside the swiper container boundaries
          const swiperRect = swiperContainer.getBoundingClientRect();
          const textRect = textElement.getBoundingClientRect();
  
          // Check bounds for X (left-right)
          if (newX < 0) newX = 0;
          if (newX + textRect.width > swiperRect.width) {
            newX = swiperRect.width - textRect.width;
          }
  
          // Check bounds for Y (top-bottom)
          if (newY < 0) newY = 0;
          if (newY + textRect.height > swiperRect.height) {
            newY = swiperRect.height - textRect.height;
          }
  
          // Apply the new position
          textElement.style.left = newX + 'px';
          textElement.style.top = newY + 'px';
        }
      });
  
      document.addEventListener('mouseup', function() {
        isDragging = false;
        textElement.style.zIndex = ''; // Reset zIndex
      });
    }
  
    // Disable Swiper navigation while editing text
    document.addEventListener('focusin', function(e) {
      if (e.target.classList.contains('draggable-text')) {
        swiper.allowTouchMove = false;
      }
    });
  
    document.addEventListener('focusout', function(e) {
      if (e.target.classList.contains('draggable-text')) {
        swiper.allowTouchMove = true;
      }
    });
  });
  