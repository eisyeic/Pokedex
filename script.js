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
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

function render() {
    getRenderPokemon();
}


