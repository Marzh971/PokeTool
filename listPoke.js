const list = document.getElementById('pokeList');

let allPokemon = [];
let filteredPokemon = [];

const selectT1 = document.getElementById('filterType1');
const selectT2 = document.getElementById('filterType2');
const selectGen = document.getElementById('filterType3');
const inputName = document.getElementById('filterName');

const selects = document.querySelectorAll('select[id^=filterType]');

// ✅ debounce pour éviter spam
let debounceTimer;
inputName.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filter, 300);
});

selects.forEach(s => s.addEventListener('change', filter));

async function init() {
    const data = await getData();
    allPokemon = data.slice(1);

    renderPokemon(allPokemon);
    await listTypes(selectT1);
    await listTypes(selectT2);
    getGen();
}

init();


function filter() {
    const type1 = selectT1.value;
    const type2 = selectT2.value;
    const gen = selectGen.value;
    const name = inputName.value.toLowerCase();

    filteredPokemon = allPokemon.filter(pokemon => {
        if (name &&
            !pokemon.name?.fr?.toLowerCase().includes(name) &&
            !pokemon.name?.en?.toLowerCase().includes(name)) {
            return false;
        }
        if (type1 !== "all" &&
            !pokemon.types?.some(t => t.name === type1)) {
            return false;
        }
        if (type2 !== "all" &&
            !pokemon.types?.some(t => t.name === type2)) {
            return false;
        }
        if (gen !== "all" && pokemon.generation != gen) {
            return false;
        }
        return true;
    });
    renderPokemon(filteredPokemon);
}


function renderPokemon(pokemons) {
    list.innerHTML = "";

    const batchSize = 50;
    let index = 0;

    function renderBatch() {
        const fragment = document.createDocumentFragment();

        const slice = pokemons.slice(index, index + batchSize);

        for (let pokemon of slice) {

            const div = document.createElement("div");
            div.className = "uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded";

            div.innerHTML = `
                <p class="poke-id">
                    <span class="poke-number">${pokemon.pokedex_id}</span>

                     <a class="poke-info" href="https://www.pokepedia.fr/${pokemon.name?.fr}" target="_blank">
                        <span uk-icon="info"></span>
                    </a>
                </p>
                <div class="pokeImg">
                  <img loading="lazy" src="${pokemon.sprites?.regular || ""}">
                </div>
            `;

            for (const type of (pokemon.types || [])) {
                const p = document.createElement("p");
                p.className = type.name.toLowerCase();
                p.classList.add("type-container");
                p.classList.add(type.name.toLowerCase());

                p.innerHTML = `
                    <img class="imgType" loading="lazy" src="${type.image}">
                    <span class="type">${type.name}</span>
                `;

                div.appendChild(p);
            }
            div.innerHTML += `
                <p class="poke-name-fr">Fr : ${pokemon.name?.fr || ""}</p>
                <p class="poke-name-en">En : ${pokemon.name?.en || ""}</p>
            `;
            fragment.appendChild(div);
        }
        list.appendChild(fragment);
        index += batchSize;
        if (index < pokemons.length) {
            requestAnimationFrame(renderBatch);
        }
    }

    renderBatch();
}


async function getData() {

    const httpResponse = await fetch("https://tyradex.app/api/v1/pokemon", {method: 'GET'})
    if (httpResponse.status === 200 && httpResponse.ok) {
        return httpResponse.json()
    }
}

async function listPokemon() {
    const data = await getData();
    allPokemon = data.slice(1);
    console.log(data);
    renderPokemon(allPokemon);

}

async function getAllTypes() {
    const httpResponse = await fetch("https://tyradex.app/api/v1/types", {method: 'GET'});
    if (httpResponse.status === 200 && httpResponse.ok) {
        return httpResponse.json()
    }
}

async function listTypes(select) {
    const data = await getAllTypes();
    console.log(data);

    for (let type of data) {
        const option = document.createElement("option");
        option.value = type.name?.fr;
        option.text = type.name?.fr;
        select.append(option);
    }
}

async function getGen() {
    let genMax = allPokemon[allPokemon.length - 1].generation;

    for (let i = 1; i <= genMax; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectGen.append(option);
    }
}



/////Partie bouton haut /////
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}