//Renders Pokemon cards for newly loaded Pokemon to the main element

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

//Renders the type icons for a specific Pokemon

function getRenderTypesElements(index) {
    for (let i = 0; i < pokemon[index].types.length; i++) {
        document.getElementById(`types-elements-${index}`).innerHTML +=
            `<div class="types-icon background-${pokemon[index].types[i].type.name}">
            <img src="./assers/icons/${pokemon[index].types[i].type.name}.svg">
            </div>`
    }
}

// Renders a single Pokemon card with click functionality to open details

function renderPokemonCard(index) {
    const mainElement = document.getElementById('main-elements');
    mainElement.innerHTML +=
        `<div class="pokemon-container" onclick="openDetails(${index})">
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

// Renders the detailed view of a Pokemon in the overlay

function getRenderPokemonDetails(index) {
    document.getElementById('overlay-click').classList.remove('overlay-d-none');
    let detailsContainer = document.getElementById('pokemon-details-container');

    detailsContainer.innerHTML = `
        <div class="pokemon-details-header">
            <div class="pokemon-details-header-headline">
                <h1>#${pokemon[index].id}</h1>
                <h1>${pokemon[index].name.charAt(0).toUpperCase() + pokemon[index].name.slice(1)}</h1>
            </div>
            <h1 class="pokemon-details-close" onclick="closeDetails()">X</h1>
        </div>
        <div class="pokemon-details-img background-${pokemon[index].types[0].type.name}">
            <img src="${pokemon[index].img}" alt="${pokemon[index].name}">
        </div>
        <div class="pokemon-details-types">
            <div onclick="lastPokemon()">
                <img class="pokemon-details-types-button" src="./assers/icons/pfeil_links.png">
            </div>
            <div class="pokemon-details-types-icons">${getPokemonTypesHTML(index)}</div>
            <div onclick="nextPokemon()">
                <img class="pokemon-details-types-button" src="./assers/icons/pfeil_rechts.png">
            </div>
        </div>
    
        <div class="pokemon-tabs">
            <div id="main-button" class="tab-button active" onclick="changeTab('main-tab', 'main-button')">Main</div>
            <div id="stats-button" class="tab-button" onclick="changeTab('stats-tab', 'stats-button')">Stats</div>
            <div id="moves-button" class="tab-button" onclick="changeTab('moves-tab', 'moves-button')">Moves</div>
        </div>
        
        <div class="tab-content">
            <div id="main-tab" class="d-none-tab active main-tab">
                <div class="pokemon-main-info">
                    <div class="info-row">
                        <span class="info-label">Height:</span>
                        <span class="info-value">${pokemon[index].height / 10} m</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Weight:</span>
                        <span class="info-value">${pokemon[index].weight / 10} kg</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Base Experience:</span>
                        <span class="info-value">${pokemon[index].base_experience}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Abilities:</span>
                        <span class="info-value">${getPokemonAbilities(index)}</span>
                    </div>
                </div>
            </div>

            </div> 
            <div id="stats-tab" class="d-none-tab stats-tab">
                <div class="pokemon-stats">
                    <div class="stat-bar">
                        <span class="stat-label">HP:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[0].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 0)}</span>
                    </div>
                    <div class="stat-bar">
                        <span class="stat-label">Attack:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[1].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 1)}</span>
                    </div>
                    <div class="stat-bar">
                        <span class="stat-label">Defense:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[2].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 2)}</span>
                    </div>
                    <div class="stat-bar">
                        <span class="stat-label">Special-Attack:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[3].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 3)}</span>
                    </div>
                    <div class="stat-bar">
                        <span class="stat-label">Special-Defense:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[4].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 4)}</span>
                    </div>
                    <div class="stat-bar">
                        <span class="stat-label">Speed:</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${pokemon[index].stats ? (pokemon[index].stats[5].base_stat / 2) + '%' : '0%'}"></div>
                        </div>
                        <span>${getStatValue(index, 5)}</span>
                    </div>
                </div>
            </div>


            <div id="moves-tab" class="d-none-tab">
                <div class="pokemon-moves">
                    <div class="moves-container">${getPokemonMoves(index)}
                    </div>
                </div>
            </div>
        </div>`;
}

// Generates HTML for displaying a Pokemon's type icons

function getPokemonTypesHTML(index) {
    let typesHTML = '';
    for (let i = 0; i < pokemon[index].types.length; i++) {
        typesHTML += `
        <div class="types-icon background-${pokemon[index].types[i].type.name}">
            <img src="./assers/icons/${pokemon[index].types[i].type.name}.svg">
        </div>`;
    }
    return typesHTML;
}
