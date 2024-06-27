const MAX_POKEMON = 251;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];


fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    console.log(data);
    console.log(data.results);
    display(allPokemons);
  })
  .catch((error) => {
    console.error("Failed to fetch Pokemon list:", error);
  });

async function fetchdatabeforeredirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json())
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirecting:", error);
    return false;
  }
}

function display(pokemons) {
  listWrapper.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-font">#${pokemonID}</p>
      </div>
      <div class="img-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" loading="lazy">
      </div>
      <div class="name-wrap">
        <p class="body3-font">${pokemon.name}</p>
      </div>
    `;
    listItem.addEventListener("click", async () => {
      const success = await fetchdatabeforeredirect(pokemonID);
      console.log(success)
      if (success) {
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });
    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    filteredPokemons = allPokemons;
  }

  display(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton=document.querySelector(".search-close-icon");
closeButton.addEventListener("click",clearSearch);


function clearSearch(){
  searchInput.value="";
  display(allPokemons);
  notFoundMessage.style.display="none";

}
// Example JavaScript code to dynamically set the cursor
const element = document.querySelector('.custom-cursor-element');
element.addEventListener('mouseenter', () => {
    element.style.cursor = 'url(images/custom-cursor.png), auto';
});
