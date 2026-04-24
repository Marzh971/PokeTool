
let allPokemon = [];
let contentQuizz = document.getElementById("quizzUnique");
let pokemon = []

async function init() {
    const data = await getData();
    allPokemon = data.slice(1);
    await pokeRandom();

}

async function pokeRandom(){
    let nbrRandom = Math.floor(Math.random() * allPokemon.length);
     pokemon = allPokemon[nbrRandom];
    // console.log(pokemon);
    document.getElementById("categorie").innerHTML = pokemon.category;
    document.getElementById("pokeImg").src =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_id}.png`
}

init();
document.getElementById("btnChanger").addEventListener("click", () => {
    document.getElementById('point').innerText = "0";
    document.getElementById('reponse').innerText = "";
    pokeRandom();
    document.getElementById("pokemonName").value = "";
});
document.getElementById("pokemonName").addEventListener("input", () => {
    if (document.getElementById("pokemonName").value.trim().toLowerCase() === pokemon.name?.fr.toLocaleLowerCase()) {
        const nbr = parseInt(document.getElementById("point").innerText) + 1;
        document.getElementById('point').innerText = nbr;
        pokeRandom();
        document.getElementById("pokemonName").value = "";
        document.getElementById('reponse').classList.remove("uk-text-danger")  ;
        document.getElementById('reponse').classList.add("uk-text-success")  ;
        document.getElementById("reponse").innerText = "Bonne réponse !";

    }
});

document.getElementById("btnValider").addEventListener("click", () => {
    document.getElementById('reponse').innerText = "Nom : "+ pokemon.name?.fr;
    document.getElementById('reponse').classList.add("uk-text-danger")  ;
    document.getElementById('reponse').classList.remove("uk-text-success")  ;
    document.getElementById('point').innerText = "0";
});
