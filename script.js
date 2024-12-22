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


