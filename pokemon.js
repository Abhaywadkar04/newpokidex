const MAX_POKEMON = 251;
const listWrapper = document.querySelector(".list-wrapper");
const listWrapper2 = document.querySelector(".list-wrapper2");
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
      <button class="card-pokemon ${pokemon.name.toLowerCase()} js-open-details-pokemon">
        <div class="image">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" loading="lazy">
        </div>
        <div class="info">
          <div class="text">
            <span>#${pokemonID.toString().padStart(3, '0')}</span>
            <h3>${pokemon.name}</h3>
          </div>
        </div>
      </button>
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


document.addEventListener("DOMContentLoaded", () => {
  const listWrapper2 = document.getElementById("listWrapper2");

  async function fetchPokemonList() {
      try {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
          const data = await response.json();
          display2(data.results);
      } catch (error) {
          console.error("Failed to fetch Pokemon list:", error);
      }
  }

  function display2(pokemons) {
      listWrapper2.innerHTML = "";

      // Show only starting 3 pokemon
      const startingPokemons = [pokemons[0], pokemons[3], pokemons[6], pokemons[24]];

      startingPokemons.forEach((pokemon) => {
          const pokemonID = pokemon.url.split("/")[6];
          const listItem = document.createElement("div");
          listItem.className = "list-item";
          listItem.innerHTML = `
          <button class="card-pokemon ${pokemon.name.toLowerCase()} js-open-details-pokemon">
              <div class="image">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" loading="lazy">
              </div>
              <div class="info">
                  <div class="text">
                      <span>#${pokemonID.toString().padStart(3, '0')}</span>
                      <h3>${pokemon.name}</h3>
                  </div>
                  
              </div>
          `;
          listItem.addEventListener("click", async () => {
              const success = await fetchdatabeforeredirect(pokemonID);
              if (success) {
                  window.location.href = `./detail.html?id=${pokemonID}`;
              }
          });
          listWrapper2.appendChild(listItem);
      });
  }

  fetchPokemonList();
});


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
  display2(allPokemons);
  notFoundMessage.style.display="none";

}
// Example JavaScript code to dynamically set the cursor
const element = document.querySelector('.custom-cursor-element');
element.addEventListener('mouseenter', () => {
    element.style.cursor = 'url(images/custom-cursor.png), auto';
});
