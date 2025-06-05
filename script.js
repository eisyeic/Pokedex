let offset = 0;
let limit = 20;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
let pokemon = [];
let currentPokemonIndex = 0;

//Initializes the application by loading the API data and setting up the search input event

function init() {
    loadAPI();
    document.getElementById('search-input').onkeyup = filterPokemon;
}

//Loads more Pokemon by increasing the offset and calling the API

function loadMorePokemon() {
    offset += limit;
    const moreButton = document.getElementById('next-pokemon');
    moreButton.classList.add('d-none');
    loadAPI().then(() => {
        moreButton.classList.remove('d-none');
    });
}

//Fetches Pokemon data from the API and stores it in the pokemon array

async function loadAPI() {
    try {
        showLoadingScreen();
        BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const response = await fetch(BASE_URL);
        const data = await response.json();
        const results = data.results;

        for (let index = 0; index < results.length; index++) {
            const pokemonResponse = await fetch(results[index].url);
            const pokemonData = await pokemonResponse.json();

            let moveNames = [];
            for (let i = 0; i < pokemonData.moves.length; i++) {
                moveNames.push(pokemonData.moves[i].move.name);
            }
            pokemonPush(index, results, pokemonData, moveNames);
        }

        render();
        hideLoadingScreen();
        return Promise.resolve(); // Return a resolved promise
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        hideLoadingScreen();
        return Promise.reject(error); // Return a rejected promise
    }
}

// Push Data in the pokemon array

function pokemonPush(index, results, pokemonData, moveNames) {
    pokemon.push({
        name: results[index].name,
        img: pokemonData.sprites.other.home.front_default,
        types: pokemonData.types,
        id: pokemonData.id,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities,
        base_experience: pokemonData.base_experience,
        stats: pokemonData.stats,
        moves: moveNames,
    });
}

//Renders the Pokemon cards to the main element and handles the visibility of the "More Pokemon" button

function render() {
    const mainElement = document.getElementById('main-elements');
    mainElement.innerHTML = '';
    const moreButton = document.getElementById('next-pokemon');

    if (pokemon.length === 0) {
        mainElement.innerHTML = `
            <div class="no-results">
                <h2>No Pokémon found</h2>
                <p>Try a different search term.</p>
            </div>
        `;
        moreButton.classList.add('d-none');
        return;
    }
    moreButton.classList.remove('d-none');

    for (let index = 0; index < pokemon.length; index++) {
        renderPokemonCard(index);
    }
}

//Shows the loading screen while data is being fetched

function showLoadingScreen() {
    document.getElementById('load-window-container').classList.remove('d-none');
}

//Hides the loading screen after data has been fetched

function hideLoadingScreen() {
    document.getElementById('load-window-container').classList.add('d-none');
}

//Filters Pokemon based on the search input and renders the filtered results

async function filterPokemon() {
    let searchInput = document.getElementById('search-input');
    let searchTerm = searchInput.value.toLowerCase();
    let searchHint = document.getElementById('search-hint');

    if (searchTerm.length > 0 && searchTerm.length < 3) {
        searchHint.textContent = "Please enter at least 3 letters";
        searchHint.classList.remove('d-none');
        return;
    } else {
        searchHint.classList.add('d-none');
    }

    if (searchTerm === '') {
        offset = 0;
        pokemon = [];
        loadAPI();
    } else if (searchTerm.length >= 3) {
        showLoadingScreen();
        try {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            let data = await response.json();
            let allResults = data.results;

            let filteredResults = [];

            for (let i = 0; i < allResults.length; i++) {
                let pokemonName = allResults[i].name.toLowerCase();

                if (pokemonName.startsWith(searchTerm)) {
                    filteredResults.push(allResults[i]);
                }
            }
            pokemon = [];

            for (let i = 0; i < filteredResults.length; i++) {
                const pokemonResponse = await fetch(filteredResults[i].url);
                const pokemonData = await pokemonResponse.json();

                let moveNames = [];
                for (let j = 0; j < pokemonData.moves.length; j++) {
                    moveNames.push(pokemonData.moves[j].move.name);
                }
                pokemonPush(index, results, pokemonData, moveNames)
            }
            render();
        } catch (error) {
            console.error('Fehler bei der Suche:', error);
        }
        hideLoadingScreen();
    }
}


//Gets the stat value for a specific Pokemon and stat index, with error handling

function getStatValue(index, statIndex) {
    if (!pokemon[index].stats || !pokemon[index].stats[statIndex]) {
        return 'N/A';
    }
    return pokemon[index].stats[statIndex].base_stat;
}

//Opens the details overlay for a specific Pokemon

function openDetails(index) {
    document.getElementById('overlay-click').classList.remove('d-none');
    document.body.classList.add('overlay-open');
    document.body.style.overflow = 'hidden';
    currentPokemonIndex = index; // Store the current index
    getRenderPokemonDetails(index);
}

// Closes the details overlay and restores normal scrolling

function closeDetails() {
    document.getElementById('overlay-click').classList.add('d-none');
    document.body.classList.remove('overlay-open');
    document.body.style.overflow = '';
}

// Generates HTML for displaying a Pokemon's moves

function getPokemonMoves(index) {
    if (!pokemon[index].moves || pokemon[index].moves.length === 0) {
        return '<p>No moves available</p>';
    }

    let movesHTML = '';
    const maxMoves = pokemon[index].moves.length;

    for (let i = 0; i < maxMoves; i++) {
        const moveName = pokemon[index].moves[i].replace(/-/g, ' ');
        movesHTML += `<span class="move-pill">${moveName}</span>`;
    }

    return movesHTML;
}

// Changes the active tab in the Pokemon details view

function changeTab(tabId, buttonId) {
    removeTab();
    removeTabButton();
    activateTab(tabId, buttonId);
}

// Activates a specific tab and its button

function activateTab(tabId, buttonId) {
    document.getElementById(tabId).classList.add('active');
    document.getElementById(buttonId).classList.add('active');
}

//Removes the active class from all tabs

function removeTab() {
    document.getElementById('main-tab').classList.remove('active');
    document.getElementById('stats-tab').classList.remove('active');
    document.getElementById('moves-tab').classList.remove('active');
}

// Removes the active class from all tab buttons

function removeTabButton() {
    document.getElementById('main-button').classList.remove('active');
    document.getElementById('stats-button').classList.remove('active');
    document.getElementById('moves-button').classList.remove('active');
}

// Gets a formatted string of a Pokemon's abilities

function getPokemonAbilities(index) {
    let abilities = '';
    for (let i = 0; i < pokemon[index].abilities.length; i++) {
        abilities += pokemon[index].abilities[i].ability.name;
        if (i < pokemon[index].abilities.length - 1) {
            abilities += ', ';
        }
    }
    return abilities;
}

//Navigates to the previous Pokemon in the list when viewing details

function lastPokemon() {
    let currentIndex = getCurrentPokemonIndex();
    let prevIndex = (currentIndex - 1 + pokemon.length) % pokemon.length;

    closeDetails();
    openDetails(prevIndex);
}

//Navigates to the next Pokemon in the list when viewing details

function nextPokemon() {
    let currentIndex = getCurrentPokemonIndex();
    let nextIndex = (currentIndex + 1) % pokemon.length;

    closeDetails();
    openDetails(nextIndex);
}

// Return Pokemon Index in the Array

function getCurrentPokemonIndex() {
    return currentPokemonIndex;
}
