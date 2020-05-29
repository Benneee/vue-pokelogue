<template>
  <div class="wrapper">
    <div class="sk-chase" v-if="isLoading">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>

    <div class="pokemons" v-if="pokemons.length > 0 && !isLoading">
      <article v-for="(pokemon, index) in pokemons" :key="'poke' + index">
        <img :src="pokemon.img" :alt="pokemon.name" height="96" width="96" />
        <h3>{{ pokemon.name }}</h3>
      </article>
    </div>
    <footer class="btns" v-if="pokemons.length > 0 && !isLoading">
      <button class="page-btn" v-if="previousPageAvailable" @click="previous">
        Previous
      </button>
      <button class="page-btn" @click="next">Next</button>
    </footer>

    <div v-if="pokemons.length === 0 && !isLoading">
      <article>
        <h3>No results to display</h3>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pokemons',
  components: {},
  data: () => {
    return {
      nextPageUrl: '',
      previousPageUrl: '',
      currentUrl: '',
      isLoading: false,
      previousPageAvailable: false,
      pokemons: [],
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
    };
  },
  methods: {
    getPokemonId(url) {
      return Number(url.split('/')[6]);
    },
    fetchPokemonData() {
      this.isLoading = true;
      let url = this.currentUrl;
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          if (data.next) {
            this.nextPageUrl = data.next;
          }
          if (data.previous) {
            this.previousPageUrl = data.previous;
          } else {
            this.previousPageAvailable = false;
          }
          this.pokemons = data.results.map((pokemon) => {
            return {
              name: pokemon.name,
              img: `${this.imageUrl}${this.getPokemonId(pokemon.url)}.png`,
            };
          });
          this.isLoading = false;
        })
        .catch((error) => {
          console.log('error: ', error);
          this.isLoading = false;
        });
    },

    next() {
      this.currentUrl = this.nextPageUrl;
      this.fetchPokemonData();
      this.previousPageAvailable = true;
    },

    previous() {
      this.currentUrl = this.previousPageUrl;
      this.fetchPokemonData();
    },
  },

  created() {
    this.currentUrl = this.apiUrl;
    this.fetchPokemonData();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.pokemons {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1rem;
  width: 100vw;
  max-width: 70%;
}

article {
  height: 150px;
  background: rgb(178, 178, 185);
  background: linear-gradient(
    90deg,
    rgba(178, 178, 185, 1) 11%,
    rgb(173, 136, 136) 51%,
    rgb(177, 174, 42) 84%
  );
  text-align: center;
  text-transform: capitalize;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

article:hover {
  box-shadow: 0 20px 36px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

article h3 {
  margin: 0;
}

footer {
  text-align: center;
  margin-top: 1rem;
}

.page-btn {
  background: crimson;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.7rem;
  width: 5rem;
}

.page-btn:nth-of-type(odd) {
  margin-right: 1rem;
}

@media screen and (max-width: 640px) {
  .pokemons {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 1rem;
    width: 100vw;
    max-width: unset;
  }

  article:nth-of-type(odd) {
    margin-left: 5px;
  }

  article:nth-of-type(even) {
    margin-right: 5px;
  }
}
</style>
