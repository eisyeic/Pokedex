let offset = 0;
let limit = 20;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
let pokemon = [];


function init() {
    loadAPI();

}

function loadMorePokemon() {
    offset += limit;
    loadAPI();
}


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

            pokemon.push({
                name: results[index].name,
                img: pokemonData.sprites.other.home.front_default,
                types: pokemonData.types,
                id: pokemonData.id,
                height: pokemonData.height,
                weight: pokemonData.weight
            });
        }

        render();
        hideLoadingScreen();
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        hideLoadingScreen();
    }
}

function render() {
    const mainElement = document.getElementById('main-elements');
    mainElement.innerHTML = '';

    for (let index = 0; index < pokemon.length; index++) {
        renderPokemonCard(index);
    }
}


function showLoadingScreen() {
    document.getElementById('load-window-container').classList.remove('d-none');
}

function hideLoadingScreen() {
    document.getElementById('load-window-container').classList.add('d-none');
}

async function filterPokemon() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        offset = 0;
        pokemon = [];
        loadAPI();
    } else {
        showLoadingScreen();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();
            const allResults = data.results;

            const filteredResults = allResults.filter(p =>
                p.name.toLowerCase().startsWith(searchTerm)
            );

            pokemon = [];

            for (let i = 0; i < filteredResults.length; i++) {
                const pokemonResponse = await fetch(filteredResults[i].url);
                const pokemonData = await pokemonResponse.json();

                pokemon.push({
                    name: filteredResults[i].name,
                    img: pokemonData.sprites.other.home.front_default,
                    types: pokemonData.types,
                    id: pokemonData.id,
                    height: pokemonData.height,
                    weight: pokemonData.weight
                });
            }

            render();
        } catch (error) {
            console.error('Fehler bei der Suche:', error);
        }
        hideLoadingScreen();
    }
}

