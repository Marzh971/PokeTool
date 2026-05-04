// let allPokemon = [];
let nomsFR = [];
let score = 0;
const inputNameS = document.getElementById("pokeName");
init();
const scoreSpan = document.getElementById("score");

async function init() {
    const data = await getData();
    allPokemon = data.slice(1);
    console.log(allPokemon);
     nomsFR = allPokemon.map(pokemon => pokemon.name.fr.toLocaleLowerCase());
     await getGen();
     filterGen();
    createQuizz(allPokemon);

}

function filterGen() {
    const gen = selectGen.value;

    filteredPokemon = allPokemon.filter(pokemon => {

        if (gen !== "all" && pokemon.generation != gen) {
            return false;
        }
        return true;
    });
    console.log(filteredPokemon);
    createQuizz(filteredPokemon)
    scoreSpan.innerText = score+'/'+filteredPokemon.length;
}

selectGen.addEventListener('change', filterGen);

function createQuizz(allPokemon) {
    score = 0;
    const div = document.getElementById('champsName')
    div.innerHTML='';
    for (pokemon of allPokemon) {
        let label = document.createElement('label');
        label.innerText = pokemon.pokedex_id;
        let input = document.createElement("input");
        input.type = "text";
        input.value = '';
        input.name = pokemon.pokedex_id;
        input.id = 'champsName' + pokemon.pokedex_id;
        input.classList.add('uk-input');
        input.classList.add('poke-input');
        input.disabled = true;

        let wrapper = document.createElement("div");
        wrapper.classList.add("poke-item");

        wrapper.append(label);
        wrapper.append(input);

        div.append(wrapper);

        // div.append(label);
        // div.append(input);
    }


    // const inputs = document.querySelectorAll('input[id^=champsName]');
    // // console.log(nomsFR);
    // inputs.forEach(s => s.addEventListener('input', (e) =>{
    //     if (nomsFR.toLowerCase().includes(e.target.value)) {
    //         console.log("test")
    //     }
    //     else {
    //         console.log(e.target.value)
    //     }
    // }));

    inputNameS.addEventListener("input", (e) => {
        const valeur = e.target.value.toLowerCase();

        const index = nomsFR.indexOf(valeur);

        if (index !== -1) {
            const pokemon = allPokemon[index];

            const input = document.getElementById(`champsName${pokemon.pokedex_id}`);
            input.value = pokemon.name.fr;
            inputNameS.value = '';
            input.classList.remove('poke-input');
            input.classList.add('valid-input');
            score = score+1;
            scoreSpan.innerText = score+'/'+filteredPokemon.length;

        }
    });


}

