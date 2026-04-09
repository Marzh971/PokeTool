
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
     console.log(data);
     console.log(data[1].types[0].image);
    const li = document.createElement("li");
    // li.innerText = data[1].name.fr;
    for (const type of data[1].types) {
    
    }
    li.innerHTML = "<div><img src='"+data[1].sprites.regular +"' >" +

         "<img src='"+data[1].types[0].image +"' >" +
        // "<img src='https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/plante.png' >" +
        "<p>Fr : "+data[1].name.fr+"</p>" +
        "<p>En : "+data[1].name.en+"</p>" +
        "</div>"
    // console.log(li);
     document.getElementById('pokeList').append(li);
    // for (let pokemon of data) {
    //     const li = document.createElement("li");
    //     li.innerText = pokemon.name.fr;
    //     list.append(li);
    //
    //     // list.append(li);
    //
    // }
}