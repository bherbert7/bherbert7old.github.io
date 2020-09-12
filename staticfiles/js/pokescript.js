const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colours = {
	fire: '#F08030',
	grass: '#78C850',
	electric: '#F8D030',
	water: '#6890F0',
	ground: '#E0C068',
	rock: '#B8A038',
	fairy: '#fceaff',
	poison: '#A040A0',
	bug: '#A8B820',
	dragon: '#7038F8',
	psychic: '#F85888',
	flying: '#A890F0',
	fighting: '#C03028',
	normal: '#A8A878'
};
const main_types = Object.keys(colours);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const utype = type[0].toUpperCase() + type.slice(1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const colour = colours[type];
	
	pokemonEl.style.backgroundColor = colour;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${utype}</span></small>
        </div>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

fetchPokemons();
