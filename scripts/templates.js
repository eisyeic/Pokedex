function getRenderPokemon() {
    const mainElement = document.getElementById('main-elements');
    const startIndex = pokemon.length - limit;
    
    for (let index = startIndex; index < pokemon.length; index++) {
        mainElement.innerHTML +=
            `<div class="pokemon-container">
                <div class="pokemon-header">
                    <h1>#${pokemon[index].id}</h1>
                    <h1>${pokemon[index].name.charAt(0).toUpperCase() + pokemon[index].name.slice(1)}</h1>
                </div>
                <a class="pokemon-img background-${pokemon[index].types[0].type.name}"><img src="${pokemon[index].img}"></a>
                <div class="types-container-icons" id="types-elements-${index}">
                    
                </div>
            </div>`;

        getRenderTypesElements(index);
    }
}

function getRenderTypesElements(index) {
    for (let i = 0; i < pokemon[index].types.length; i++) {
        document.getElementById(`types-elements-${index}`).innerHTML +=
            `<div class="types-icon background-${pokemon[index].types[i].type.name}">
            <img src="./assers/icons/${pokemon[index].types[i].type.name}.svg">
            </div>`
    }
}

function renderPokemonCard(index) {
    const mainElement = document.getElementById('main-elements');
    mainElement.innerHTML +=
        `<div class="pokemon-container">
            <div class="pokemon-header">
                <h1>#${pokemon[index].id}</h1>
                <h1>${pokemon[index].name.charAt(0).toUpperCase() + pokemon[index].name.slice(1)}</h1>
            </div>
            <a class="pokemon-img background-${pokemon[index].types[0].type.name}"><img src="${pokemon[index].img}"></a>
            <div class="types-container-icons" id="types-elements-${index}">
                
            </div>
        </div>`;

    getRenderTypesElements(index);
}
