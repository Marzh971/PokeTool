// let allPokemon = [];
let nomsFR = [];
const inputNameS = document.getElementById("pokeName");
init();

async function init() {
    const data = await getData();
    allPokemon = data.slice(1);
    console.log(allPokemon);
     nomsFR = allPokemon.map(pokemon => pokemon.name.fr.toLocaleLowerCase());
    createQuizz(allPokemon);

}

function createQuizz(allPokemon) {
    const div = document.getElementById('champsName')
    for (pokemon of allPokemon) {
        let label = document.createElement('label');
        label.innerText = pokemon.pokedex_id;
        let input = document.createElement("input");
        input.type = "text";
        input.value = '';
        input.name = pokemon.pokedex_id;
        input.id = 'champsName' + pokemon.pokedex_id;
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
        }
    });


}

