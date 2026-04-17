
let allPokemon = [];

async function init() {
    const data = await getData();
    allPokemon = data.slice(1);
    await pokeRandom();

}

async function pokeRandom(){
    let nbrRandom = Math.floor(Math.random() * allPokemon.length);
    console.log(nbrRandon);
}

init();