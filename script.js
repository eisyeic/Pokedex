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
                weight: pokemonData.weight,
                abilities: pokemonData.abilities,
                base_experience: pokemonData.base_experience,
                stats: pokemonData.stats,
                evolution_chain: pokemonData
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
                    evolution_chain: pokemonData.species.evolution_chain.url,
                });
            }

            render();
        } catch (error) {
            console.error('Fehler bei der Suche:', error);
        }
        hideLoadingScreen();
    }
}

function getStatValue(index, statIndex) {
    if (!pokemon[index].stats || !pokemon[index].stats[statIndex]) {
        return 'N/A';
    }
    return pokemon[index].stats[statIndex].base_stat;
}


