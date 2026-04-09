void listPokemon();



async function getData() {

    const httpResponse = await fetch("https://tyradex.app/api/v1/pokemon", {method: 'GET'})
    if (httpResponse.status === 200 && httpResponse.ok) {
        return httpResponse.json()
    }
}

async function listPokemon() {
    const data = await getData();
    const list = document.getElementById('pokeList');

    const batchSize = 50;
    let index = 1; // skip 0 (souvent invalide)

    function renderBatch() {
        let html = "";

        const slice = data.slice(index, index + batchSize);

        for (let pokemon of slice) {
            html += "<div>";
            html += "<img loading='lazy' src='" + (pokemon.sprites?.regular || "") + "'>";

            for (const type of (pokemon.types || [])) {

                // classe générique 'type-badge' + classe spécifique basée sur le nom du type
                const typeClass = type.name.toLowerCase();

                html += "<p class='" + typeClass + "'>" +
                    "<img class='imgType' loading='lazy' src='" + type.image + "'>" +
                    "<span>" + type.name + "</span>" +
                    "</p>";
            }

            html +=
                "<p>Fr : " + (pokemon.name?.fr || "") + "</p>" +
                "<p>En : " + (pokemon.name?.en || "") + "</p>";
            html += "</div>";
        }

        list.innerHTML += html; // append sans bloquer tout

        index += batchSize;

        if (index < data.length) {
            requestAnimationFrame(renderBatch); // ✅ fluide
        }
    }
    list.innerHTML = "";
    renderBatch();
}
