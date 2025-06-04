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
        `<div class="pokemon-container" onclick="getRenderPokemonDetails(${index})">
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

function getRenderPokemonDetails(index) {
    // Zeige das Overlay an
    document.getElementById('overlay-click').classList.remove('overlay-d-none');

    // Hole den Container für die Details
    const detailsContainer = document.getElementById('pokemon-details-container');

    // Fülle den Container mit den Pokémon-Details
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
            ${getPokemonTypesHTML(index)}
        </div>
    
        <div class="pokemon-tabs">
            <div id="main-button" class="tab-button active" onclick="changeTab('main-tab', 'main-button', ${index})">Main</div>
            <div id="stats-button" class="tab-button" onclick="changeTab('stats-tab', 'stats-button', ${index})">Stats</div>
            <div id="evo-button" class="tab-button" onclick="changeTab('evo-tab', 'evo-button', ${index})">Evolution</div>
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


            <div id="evo-tab" class="d-none-tab">
                <div class="pokemon-evolution">
                    <h3>Evolution Chain:</h3>
                    <p>Evolution data not available</p>
                </div>
            </div>
        </div>`;
}

// Funktion zum Umschalten der Tabs
function changeTab(tabId, buttonId, index) {
    // Alle Tab-Inhalte ausblenden
    document.getElementById('main-tab').classList.remove('active');
    document.getElementById('stats-tab').classList.remove('active');
    document.getElementById('evo-tab').classList.remove('active');
    
    // Alle Tab-Buttons deaktivieren
    document.getElementById('main-button').classList.remove('active');
    document.getElementById('stats-button').classList.remove('active');
    document.getElementById('evo-button').classList.remove('active');
    
    // Gewählten Tab-Inhalt anzeigen
    document.getElementById(tabId).classList.add('active');
    
    // Gewählten Button aktivieren
    document.getElementById(buttonId).classList.add('active');
}

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



// Funktion zum Schließen der Details
function closeDetails() {
    document.getElementById('overlay-click').classList.add('overlay-d-none');
}

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
