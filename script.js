let pokemon = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"

function init() {
    loadAPI("");
    // render();
}


async function loadAPI(path = "") {

    let pokeResponse = await getAllPokemon(path = "");
    console.log(pokeResponse);
    
    let pokeKeysArray = Object.keys(pokeResponse);

    for (let index = 0; index < pokeKeysArray.length; index++) {
        pokemon.push(
            {
                name: pokeKeysArray[index],
                url: pokeResponse[pokeKeysArray[index]],
            }
        )
    }

    console.log(pokemon);

}

async function getAllPokemon(path = "/3") {

    let responseWithObject = await fetch(BASE_URL + path + ".json");
    let responseToJsonWithObject = await responseWithObject.json();
    return responseToJsonWithObject;
}

function render() {

}

