void listPokemon();
const selectT1 = document.getElementById('filterType1');
const selectT2 = document.getElementById('filterType2');
let allPokemon = [];
const selectType = document.querySelectorAll('select[id^=filterType]')

selectType.forEach(s => {
    s.addEventListener('change', filterType);
});

function filterType() {
    const type1 = selectT1.value;
    const type2 = selectT2.value;

    let filtered = allPokemon;

    // aucun filtre
    if (type1 === "all" && type2 === "all") {
        renderPokemon(allPokemon);
        return;
    }

    // filtre type 1
    if (type1 !== "all") {
        filtered = filtered.filter(pokemon =>
            pokemon.types?.some(t => t.name === type1)
        );
    }

    // filtre type 2
    if (type2 !== "all") {
        filtered = filtered.filter(pokemon =>
            pokemon.types?.some(t => t.name === type2)
        );
    }

    renderPokemon(filtered);
}

function renderPokemon(pokemons) {

    const list = document.getElementById('pokeList');

    const batchSize = 50;
    let index = 0; // skip 0 (souvent invalide)

    function renderBatch() {
        let html = "";

        const slice = pokemons.slice(index, index + batchSize);

        for (let pokemon of slice) {
            html += "<div>";
            html += "<p>"+ pokemon.pokedex_id +"</p>";
            html += "<img loading='lazy' src='" + (pokemon.sprites?.regular || "") + "'>";

            for (const type of (pokemon.types || [])) {

                // classe générique 'type-badge' + classe spécifique basée sur le nom du type
                const typeClass = type.name.toLowerCase();

                html += "<p class='" + typeClass + "'>" +
                    "<img class='imgType' loading='lazy' src='" + type.image + "'>" +
                    "<span class='type'>" + type.name + "</span>" +
                    "</p>";
            }

            html +=
                "<p>Fr : " + (pokemon.name?.fr || "") + "</p>" +
                "<p>En : " + (pokemon.name?.en || "") + "</p>";
            html += "</div>";
        }
        list.innerHTML += html; // append sans bloquer tout
        index += batchSize;
        if (index < pokemons.length) {
            requestAnimationFrame(renderBatch); // ✅ fluide
        }
    }
    list.innerHTML = "";
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

async function getAllTypes(){
    const httpResponse =  await fetch("https://tyradex.app/api/v1/types", {method: 'GET'});
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

listTypes(selectT1);
listTypes(selectT2);


