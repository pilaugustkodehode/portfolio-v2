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

window.onload = fetchRandomPokemonFact;











// Declare global variables for images
let hairImages = [];  // Array to store hair images
let eyeImages = [];   // Array to store eye images
let eyebrowImages = [];  // Array to store eyebrow images
let clothesImages = [];  // Array to store clothes images

// Initialize the canvas and context
const canvas = document.getElementById('editorCanvas');
const ctx = canvas.getContext('2d');

// Default state for the character (selected features)
let currentHairIndex = 0;
let currentEyeIndex = 0;
let currentEyebrowIndex = 0;
let currentClothesIndex = 0;
let currentEyeColor = "#000000";  // Default eye color (black)
let currentClothesColor = "#000000";  // Default clothes color
let currentHairColor = "#000000";  // Default hair color

// Load all images (you can adjust the paths as needed)
function loadImages() {
  // Load Hair images (assuming you still have 5 options)
  for (let i = 0; i < 5; i++) { // Adjust number if you have fewer than 5 hair options
    hairImages.push(new Image());
    hairImages[i].src = `./images/Avatar/Hair/Hair${i + 1}.png`;
  }

  // Load Eye images (you mentioned you only have 2)
  for (let i = 0; i < 2; i++) {  // Adjusted for 2 eye images
    eyeImages.push(new Image());
    eyeImages[i].src = `./images/Avatar/Body/Eye${i + 1}.png`;
  }

  // Load Eyebrow images (you mentioned you have 4)
  for (let i = 0; i < 4; i++) {  // Adjusted for 4 eyebrow images
    eyebrowImages.push(new Image());
    eyebrowImages[i].src = `./images/Avatar/Eyebrows/Eyebrows${i + 1}.png`;
  }

  // Load Clothes images (you mentioned you have 4)
  for (let i = 0; i < 4; i++) {  // Adjusted for 4 clothes images
    clothesImages.push(new Image());
    clothesImages[i].src = `./images/Avatar/Clothes/Clothes${i + 1}.png`;
  }
}

// Function to draw the character on canvas
function drawCharacter() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw hair
  ctx.drawImage(hairImages[currentHairIndex], 0, 0);

  // Draw eyebrows
  ctx.drawImage(eyebrowImages[currentEyebrowIndex], 0, 0);

  // Draw eyes (apply the current eye color)
  ctx.save();
  ctx.fillStyle = currentEyeColor;
  ctx.drawImage(eyeImages[currentEyeIndex], 0, 0);
  ctx.restore();

  // Draw clothes (apply the current clothes color)
  ctx.save();
  ctx.fillStyle = currentClothesColor;
  ctx.drawImage(clothesImages[currentClothesIndex], 0, 0);
  ctx.restore();
}

// Event listeners for arrows (change features)
document.getElementById('arrowLHair').addEventListener('click', () => {
  currentHairIndex = (currentHairIndex - 1 + hairImages.length) % hairImages.length;
  drawCharacter();
});
document.getElementById('arrowRHair').addEventListener('click', () => {
  currentHairIndex = (currentHairIndex + 1) % hairImages.length;
  drawCharacter();
});

document.getElementById('arrowLEyes').addEventListener('click', () => {
  // Loop between 2 eyes (index 0 and 1)
  currentEyeIndex = (currentEyeIndex - 1 + 2) % 2;
  drawCharacter();
});
document.getElementById('arrowREyes').addEventListener('click', () => {
  // Loop between 2 eyes (index 0 and 1)
  currentEyeIndex = (currentEyeIndex + 1) % 2;
  drawCharacter();
});

document.getElementById('arrowLEyebrows').addEventListener('click', () => {
  // Loop between 4 eyebrows
  currentEyebrowIndex = (currentEyebrowIndex - 1 + 4) % 4;
  drawCharacter();
});
document.getElementById('arrowREyebrows').addEventListener('click', () => {
  // Loop between 4 eyebrows
  currentEyebrowIndex = (currentEyebrowIndex + 1) % 4;
  drawCharacter();
});

document.getElementById('arrowLClothes').addEventListener('click', () => {
  // Loop between 4 clothes
  currentClothesIndex = (currentClothesIndex - 1 + 4) % 4;
  drawCharacter();
});
document.getElementById('arrowRClothes').addEventListener('click', () => {
  // Loop between 4 clothes
  currentClothesIndex = (currentClothesIndex + 1) % 4;
  drawCharacter();
});

// Event listener for color pickers (for eyes, clothes, and hair)
document.getElementById('eyeColorPicker').addEventListener('input', (event) => {
  currentEyeColor = event.target.value;
  drawCharacter();
});

document.getElementById('clothesColorPicker').addEventListener('input', (event) => {
  currentClothesColor = event.target.value;
  drawCharacter();
});

document.getElementById('hairColorPicker').addEventListener('input', (event) => {
  currentHairColor = event.target.value;
  drawCharacter();
});

// Save button functionality
document.querySelector('.saveBtn').addEventListener('click', () => {
  // You can save the character state here, or generate an image from the canvas.
  const dataURL = canvas.toDataURL('image/png');
  console.log(dataURL);  // For example, log the image URL
  // You can also create a download link to save the image
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'customized-avatar.png';
  link.click();
});

// Initialize the images and draw the default character
loadImages();
