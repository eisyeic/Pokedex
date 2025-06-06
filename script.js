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
        const results = await fetchPokemonList();
        await loadPokemonDetails(results);
        render();
        hideLoadingScreen();
        return Promise.resolve();
    } catch (error) {
        handleApiError(error);
        return Promise.reject(error);
    }
}

//Fetches the list of Pokemon from the API

async function fetchPokemonList() {
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.results;
}

//Loads detailed data for each Pokemon in the results

async function loadPokemonDetails(results) {
    for (let index = 0; index < results.length; index++) {
        const pokemonData = await fetchSinglePokemonData(results[index].url);
        const moveNames = extractMoveNames(pokemonData);
        pokemonFirstPush(index, results, pokemonData, moveNames);
    }
}

//Fetches detailed data for a single Pokemon

async function fetchSinglePokemonData(url) {
    const pokemonResponse = await fetch(url);
    return await pokemonResponse.json();
}

//Handles API errors

function handleApiError(error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    hideLoadingScreen();
}


// Push first Data in the pokemon array

function pokemonFirstPush(index, results, pokemonData, moveNames) {
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
        noPokemonFound(mainElement);
        moreButton.classList.add('d-none');
        return;
    }
    moreButton.classList.remove('d-none');
    for (let index = 0; index < pokemon.length; index++) {
        let mainElement = document.getElementById('main-elements');
        renderPokemonCard(index, mainElement);
        renderTypesElements(index);
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
    const searchTerm = getSearchTerm();

    if (!validateSearchTerm(searchTerm)) {
        return;
    }

    if (searchTerm === '') {
        resetAndLoadAllPokemon();
    } else if (searchTerm.length >= 3) {
        await searchAndLoadFilteredPokemon(searchTerm);
    }
}

//Gets the search term from the input field

function getSearchTerm() {
    const searchInput = document.getElementById('search-input');
    return searchInput.value.toLowerCase();
}

//Validates the search term and shows/hides hint message

function validateSearchTerm(searchTerm) {
    const searchHint = document.getElementById('search-hint');

    if (searchTerm.length > 0 && searchTerm.length < 3) {
        searchHint.textContent = "Please enter at least 3 letters";
        searchHint.classList.remove('d-none');
        return false;
    } else {
        searchHint.classList.add('d-none');
        return true;
    }
}

//Resets the pokemon array and loads all pokemon

function resetAndLoadAllPokemon() {
    offset = 0;
    pokemon = [];
    loadAPI();
}

//Searches for and loads filtered pokemon based on search term

async function searchAndLoadFilteredPokemon(searchTerm) {
    showLoadingScreen();
    try {
        const filteredResults = await fetchAndFilterPokemon(searchTerm);
        await loadFilteredPokemonData(filteredResults);
        render();
    } catch (error) {
        console.error('Fehler bei der Suche:', error);
    }
    hideLoadingScreen();
}

//Fetches all pokemon and filters by name

async function fetchAndFilterPokemon(searchTerm) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    const data = await response.json();
    const allResults = data.results;

    return allResults.filter(result =>
        result.name.toLowerCase().startsWith(searchTerm)
    );
}

//Loads detailed data for filtered pokemon

async function loadFilteredPokemonData(filteredResults) {
    pokemon = [];

    for (let i = 0; i < filteredResults.length; i++) {
        const pokemonResponse = await fetch(filteredResults[i].url);
        const pokemonData = await pokemonResponse.json();
        const moveNames = extractMoveNames(pokemonData);

        pokemonSecondPush(i, filteredResults, pokemonData, moveNames);
    }
}

//Extracts move names from pokemon data

function extractMoveNames(pokemonData) {
    const moveNames = [];
    for (let j = 0; j < pokemonData.moves.length; j++) {
        moveNames.push(pokemonData.moves[j].move.name);
    }
    return moveNames;
}


// Push second Data in the pokemon array

function pokemonSecondPush(i, filteredResults, pokemonData, moveNames) {

    pokemon.push({
        name: filteredResults[i].name,
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
    currentPokemonIndex = index;

    document.getElementById('overlay-click').classList.remove('overlay-d-none');
    let detailsContainer = document.getElementById('pokemon-details-container');
    getRenderPokemonDetails(index, detailsContainer);
}

// Closes the details overlay and restores normal scrolling

function closeDetails() {
    document.getElementById('overlay-click').classList.add('d-none');
    document.body.classList.remove('overlay-open');
    document.body.style.overflow = '';
}

// Generates HTML for displaying a Pokemon's moves

function pokemonMoves(index) {
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

// index of the Pokemon Types in the pokemon array

function pokemonTypes(index) {
    let typesHTML = '';
    for (let i = 0; i < pokemon[index].types.length; i++) {
        typesHTML += getPokemonTypesHTML(index, i);
    }
    return typesHTML;
}


// index of the Pokemon Types icon in the pokemon array

function renderTypesElements(index) {
    for (let i = 0; i < pokemon[index].types.length; i++) {
        getRenderTypesElements(index, i)
    }
}