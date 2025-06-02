function getRenderPokemon(){
    for (let index = 0; index < pokemon.length; index++) {      
    
    document.getElementById('main-elements').innerHTML += 
    `<div class="pokemon-container">
                <div class="pokemon-header">
                    <h1>#${index + 1}</h1>
                    <h1>${pokemon[index].name.toUpperCase()}</h1>
                </div>
                <a class="pokemon-img"><img src="${pokemon[index].img}"></a>
                <div>
                    <button>renderElement</button>
                </div>
            </div>`
}
}