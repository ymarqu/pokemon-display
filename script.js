const linkContainer = document.querySelector(".link");
let pokemonContainer = document.querySelector(".pokemon-main-container")
const myModal = document.getElementById('modal')

function createMovesList(list, ul){
    list.forEach(function(moves){
        let itemLi = document.createElement('li');
        itemLi.classList.add('col-6');
        let text = moves['move']['name']
        itemLi.innerText = text.toUpperCase();
        ul.append(itemLi);
        return ul;
    });
}

function createModalImages(url){
    let div = document.createElement('div');
    div.classList.add('col');
    let img = document.createElement('img');
    img.src = `${url}`;
    div.append(img);
    return div;
}

function renderInfoOnModal(data){
    let modalTitle = document.querySelector('.modal-title');
    let movesContainer = document.querySelector('.moves-container');
    modalTitle.textContent = data.name;
    let rowContainer = document.querySelector('.modal-row');
    rowContainer.innerHTML = '';
    movesContainer.innerHTML = '';
    let imgURL = data.sprites['front_default'];
    let frontDiv = createModalImages(imgURL) ;
    let img2URL = data.sprites['back_default'];
    let backDiv = createModalImages(img2URL)
    let pokeMoves = document.createElement('ol')
    pokeMoves.classList.add('row', 'd-flex', 'justify-content-center')
    createMovesList(data.moves, pokeMoves)
    rowContainer.append(frontDiv, backDiv);
    movesContainer.append(pokeMoves);
    console.log(data)
}

function renderPokemon(data){
    //Create card container
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('card');
    //create image
    let image = document.createElement('img');
    image.classList.add('card-img-top', 'img-fluid')
    let imgURL = data.sprites['front_default'];
    image.src = `${imgURL}`;
    //Create card title
    let textContainer = document.createElement('div');
    textContainer.classList.add('card-body');
    let pokeName = document.createElement('h4')
    pokeName.innerText = data.name.toUpperCase();
    //Create Pokemon Id number
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `No. ${data.id}`;
    pokeNumber.classList.add('text-danger', 'fw-bold')
    //Create 'See more' button to open modal
    let btn = document.createElement('button');
    btn.innerText = "See more"
    btn.classList.add('btn', 'btn-warning', 'btn-lg');
    btn.dataset.bsToggle = "modal"
    btn.dataset.bsTarget = "#exampleModal"
    btn.addEventListener('click', () => {
        renderInfoOnModal(data);
    })
    textContainer.append(pokeName, pokeNumber, btn);
    // helper function to go through the types array and create li tags for each one
    pokeContainer.append(image, textContainer);
     //appending all details to the pokeContainer div
    pokemonContainer.appendChild(pokeContainer);
    //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}


async function getPokemon(){
    const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
    try{
    const call = await fetch(url);
    const res = await call.json();
    const pokemons = res.results;
     for(const pokemon of pokemons){
        const info = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        let infoInJson = await info.json();
        renderPokemon(infoInJson);
     }
    }
    catch(err){
        console.log(err);
    }
}


getPokemon();
