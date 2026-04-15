void listPokemon();
const SelectT1 = document.getElementById('filterType');
let allPokemon = [];

SelectT1.addEventListener('change', () => {
    // document.getElementById('selectTypeD1').disabled = true;
    const selectedType = SelectT1.value;

    if (selectedType === "all") {
        renderPokemon(allPokemon);
        return;
    }
    const filtered = allPokemon.filter(pokemon =>
        pokemon.types?.some(t => t.name === selectedType)
    );
    renderPokemon(filtered);
});

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

    // const list = document.getElementById('pokeList');
    //
    // const batchSize = 50;
    // let index = 1; // skip 0 (souvent invalide)
    //
    // function renderBatch() {
    //     let html = "";
    //
    //     const slice = data.slice(index, index + batchSize);
    //
    //     for (let pokemon of slice) {
    //         html += "<div>";
    //         html += "<img loading='lazy' src='" + (pokemon.sprites?.regular || "") + "'>";
    //
    //         for (const type of (pokemon.types || [])) {
    //
    //             // classe générique 'type-badge' + classe spécifique basée sur le nom du type
    //             const typeClass = type.name.toLowerCase();
    //
    //             html += "<p class='" + typeClass + "'>" +
    //                 "<img class='imgType' loading='lazy' src='" + type.image + "'>" +
    //                 "<span class='type'>" + type.name + "</span>" +
    //                 "</p>";
    //         }
    //
    //         html +=
    //             "<p>Fr : " + (pokemon.name?.fr || "") + "</p>" +
    //             "<p>En : " + (pokemon.name?.en || "") + "</p>";
    //         html += "</div>";
    //     }
    //
    //     list.innerHTML += html; // append sans bloquer tout
    //
    //     index += batchSize;
    //
    //     if (index < data.length) {
    //         requestAnimationFrame(renderBatch); // ✅ fluide
    //     }
    // }
    //
    //
    // list.innerHTML = "";
    // renderBatch();
}

async function getAllTypes(){
    const httpResponse =  await fetch("https://tyradex.app/api/v1/types", {method: 'GET'});
    if (httpResponse.status === 200 && httpResponse.ok) {
        return httpResponse.json()
    }
}

async function listTypes() {
    const data = await getAllTypes();
    console.log(data);

    for (let type of data) {
        const option = document.createElement("option");
        option.value = type.name?.fr;
        option.text = type.name?.fr;
        SelectT1.append(option);
    }
}

listTypes();


