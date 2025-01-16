// Get modal and canvas elements
const modal = document.getElementById('avatarEditorModal');
const editorCanvas = document.getElementById('editorCanvas');

// Open the avatar editor modal
function openAvatarEditor() {
    modal.style.display = 'block';
    drawCharacter(); // Initialize the canvas with current avatar state
}

// Close the avatar editor modal
function closeAvatarEditor() {
    modal.style.display = 'none';
}

// Load an image onto the canvas
function loadImage(src, ctx, x = 0, y = 0, width = 200, height = 400) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    };
}

// Dropdown menu toggle functionality
function dropDown() {
    document.getElementById("dropMenu").classList.toggle("show");
}

window.onclick = function(event) {
    const dropMenu = document.getElementById("dropMenu");
    const dropbtn = document.getElementById("dropbtn");
    
    if (!dropMenu.contains(event.target) && event.target !== dropbtn) {
        dropMenu.classList.remove("show");
    }
}

// Fetch random Pokémon fact
function fetchRandomPokemonFact() {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(response => response.json())
        .then(data => {
            const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const pokemonType = data.types.map(type => type.type.name).join(', ');
            const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(', ');

            const factContainer = document.getElementById('pokemonFact');
            factContainer.innerHTML = 
            `<strong>Did you know?</strong><br>
                ${pokemonName} is a ${pokemonType}-type Pokémon.<br>
                It has the abilities: ${pokemonAbilities}.`;
        })
        .catch(error => {
            console.error("Error fetching Pokémon data:", error);
        });
}

// Select necessary elements
const prevButton = document.getElementById('artPrev');
const nextButton = document.getElementById('artNext');
const carouselImages = document.querySelectorAll('.carouselImg img');
let currentIndex = 0;  // Tracks the index of the currently displayed image

// Function to update the carousel image display
function updateCarousel() {
    // Hide all images
    carouselImages.forEach((image, index) => {
        image.style.display = 'none';
    });
    // Show the current image
    carouselImages[currentIndex].style.display = 'block';
}

// Function to move to the previous image
function showPrevImage() {
    currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
    updateCarousel();
}

// Function to move to the next image
function showNextImage() {
    currentIndex = (currentIndex === carouselImages.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
}

// Set up event listeners for buttons
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

// Initialize the carousel by showing the first image
updateCarousel();

// Select necessary elements
const websitesPrevButton = document.getElementById('websitesPrev');
const websitesNextButton = document.getElementById('websitesNext');
const websitesCarouselItems = document.querySelectorAll('.carouselImg iframe');
let websitesCurrentIndex = 0;  // Tracks the index of the currently displayed website

// Function to update the website carousel
function updateWebsitesCarousel() {
    // Hide all website frames
    websitesCarouselItems.forEach((iframe, index) => {
        iframe.style.display = 'none';
    });
    // Show the current website (iframe)
    websitesCarouselItems[websitesCurrentIndex].style.display = 'block';
}

// Function to move to the previous website
function showWebsitesPrev() {
    websitesCurrentIndex = (websitesCurrentIndex === 0) ? websitesCarouselItems.length - 1 : websitesCurrentIndex - 1;
    updateWebsitesCarousel();
}

// Function to move to the next website
function showWebsitesNext() {
    websitesCurrentIndex = (websitesCurrentIndex === websitesCarouselItems.length - 1) ? 0 : websitesCurrentIndex + 1;
    updateWebsitesCarousel();
}

// Set up event listeners for buttons
websitesPrevButton.addEventListener('click', showWebsitesPrev);
websitesNextButton.addEventListener('click', showWebsitesNext);

// Initialize the carousel by showing the first website
updateWebsitesCarousel();4


const expPointsImages = document.querySelectorAll('.expPoints');

expPointsImages.forEach(image => {
  image.addEventListener('click', function() {
    // Reset any previous animation by removing and re-adding the class
    this.classList.remove('animate');
    void this.offsetWidth; // Trigger reflow to reset animation
    this.classList.add('animate');
  });
});



document.getElementById("scroll0").onclick = function() {
    const target = document.getElementById("section0");
    const targetPosition = target.offsetTop;
  
    // Scroll to the target position minus a larger offset (e.g., 100px)
    window.scrollTo({
      top: targetPosition - 60, // Adjust -100 or more as needed
      behavior: "smooth"
    });
  };

  document.getElementById("scroll1").onclick = function() {
    const target = document.getElementById("section1");
    const targetPosition = target.offsetTop;
  
    // Scroll to the target position minus a larger offset (e.g., 100px)
    window.scrollTo({
      top: targetPosition - 60, // Adjust -100 or more as needed
      behavior: "smooth"
    });
  };

  document.getElementById("scroll2").onclick = function() {
    const target = document.getElementById("section2");
    const targetPosition = target.offsetTop;
  
    // Scroll to the target position minus a larger offset (e.g., 100px)
    window.scrollTo({
      top: targetPosition - 60, // Adjust -100 or more as needed
      behavior: "smooth"
    });
  };

  document.getElementById("scroll3").onclick = function() {
    const target = document.getElementById("section3");
    const targetPosition = target.offsetTop;
  
    // Scroll to the target position minus a larger offset (e.g., 100px)
    window.scrollTo({
      top: targetPosition - 60, // Adjust -100 or more as needed
      behavior: "smooth"
    });
  };

// Avatar components
const avatarState = {
    hair: 0,
    eyes: 0,
    eyebrows: 0,
    clothes: 0,
    eyeColor: "#000000",
    hairColor: "#000000",
    clothesColor: "#FFFFFF",
    skinColor: "#FFDAB9",
};

// Component image paths
const components = {
    hair: ['./images/Avatar/Hair/Hair1.png', './images/Avatar/Hair/Hair2.png'],
    eyes: ['./images/Avatar/Eyes/eyes.png'],
    eyebrows: ['./images/Avatar/Eyebrows/Eyebrows1.png', './images/Avatar/Eyebrows/Eyebrows2.png'],
    clothes: ['./images/Avatar/Clothes/Clothes1.png', './images/Avatar/Clothes/Clothes2.png'],
};

// Update canvas with the current avatar state
function drawCharacter() {
    const ctx = editorCanvas.getContext('2d');
    ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height); // Clear canvas

    // Load base components
    loadImage('./images/Avatar/Body/eye1.png', ctx);
	loadImage(components.eyebrows[avatarState.eyebrows], ctx);
    loadImage(components.hair[avatarState.hair], ctx);
    loadImage(components.clothes[avatarState.clothes], ctx);
	loadImage(components.eyes[avatarState.eyes], ctx);

    // Apply colors
    applyColor(ctx, avatarState.eyeColor, { x: 100, y: 100, width: 50, height: 50 });
    applyColor(ctx, avatarState.hairColor, { x: 200, y: 50, width: 100, height: 100 });
    applyColor(ctx, avatarState.clothesColor, { x: 150, y: 200, width: 200, height: 150 });
    applyColor(ctx, avatarState.skinColor, { x: 50, y: 50, width: 400, height: 500 });
}

// Update avatar state and redraw
function changeComponent(type, direction) {
    const maxIndex = components[type].length - 1;
    avatarState[type] = (avatarState[type] + direction + maxIndex + 1) % (maxIndex + 1);
    drawCharacter();
}

// Apply color to specific regions
function applyColor(ctx, color, region) {
    ctx.fillStyle = color;
    ctx.fillRect(region.x, region.y, region.width, region.height);
}

// Add event listeners for arrows
document.getElementById('arrowLHair').addEventListener('click', () => changeComponent('hair', -1));
document.getElementById('arrowRHair').addEventListener('click', () => changeComponent('hair', 1));
document.getElementById('arrowLEyes').addEventListener('click', () => changeComponent('eyes', -1));
document.getElementById('arrowREyes').addEventListener('click', () => changeComponent('eyes', 1));
document.getElementById('arrowLEyebrows').addEventListener('click', () => changeComponent('eyebrows', -1));
document.getElementById('arrowREyebrows').addEventListener('click', () => changeComponent('eyebrows', 1));
document.getElementById('arrowLClothes').addEventListener('click', () => changeComponent('clothes', -1));
document.getElementById('arrowRClothes').addEventListener('click', () => changeComponent('clothes', 1));

// Add event listeners for color pickers
document.getElementById('eyeColorPicker').addEventListener('input', (e) => {
    avatarState.eyeColor = e.target.value;
    drawCharacter();
});
document.getElementById('hairColorPicker').addEventListener('input', (e) => {
    avatarState.hairColor = e.target.value;
    drawCharacter();
});
document.getElementById('clothesColorPicker').addEventListener('input', (e) => {
    avatarState.clothesColor = e.target.value;
    drawCharacter();
});
document.getElementById('skinColorPicker').addEventListener('input', (e) => {
    avatarState.skinColor = e.target.value;
    drawCharacter();
});

// Save avatar configuration
document.querySelector('.saveBtn').addEventListener('click', () => {
    const avatarDataUrl = editorCanvas.toDataURL();
    document.querySelector('.userPfp').src = avatarDataUrl;
    closeAvatarEditor();
});


window.onload = fetchRandomPokemonFact;


