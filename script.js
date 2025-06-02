let pokemon = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

function init() {
    loadAPI();

}


async function loadAPI() {

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        const results = data.results;
        for (let index = 0; index < results.length; index++) {
            const pokemonResponse = await fetch(results[index].url);
            const pokemonData = await pokemonResponse.json();
            
            pokemon.push({
                number: index,
                name: results[index].name,
                img: pokemonData.sprites.other.home.front_default,
                types: pokemonData.types.map(type => type.type.name),
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
    document.getElementById('main-elements').innerHTML = "";
    getRenderPokemon();
}