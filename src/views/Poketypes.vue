<template>
  <div class="wrapper">
    <p class="center">
      Click on any type to see the pokemons under the selected type.
    </p>
    <div class="sk-chase" v-if="isLoading">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
    <div v-if="pokemonTypes" class="btns">
      <button
        class="btn"
        v-for="(type, index) of pokemonTypes"
        :key="'type' + index"
        @click="getTypePokemons(type.url)"
      >
        {{ type.name }}
      </button>
    </div>

    <div class="pokemons" v-if="pokemonsFromType && !isLoading">
      <article
        v-for="(pokemon, index) in pokemonsFromType"
        :key="'poke' + index"
        @click="sendPokemonDetail(pokemon.id)"
      >
        <img :src="pokemon.img" :alt="pokemon.name" height="96" width="96" />

        <h3>{{ pokemon.name }}</h3>
      </article>
    </div>

    <Pokemon
      v-if="showDetail && !isLoading"
      :pokemonUrl="pokemonUrl"
      :pokemonImg="pokemonImg"
      v-on:closeDetail="closeDetail"
    />
  </div>
</template>

<script>
import Pokemon from '@/components/Pokemon.vue';
export default {
  name: 'Poketypes',
  components: {
    Pokemon,
  },
  data: () => {
    return {
      pokemonTypes: [],
      pokemonsFromType: [],
      noImg: '../assets/no-img.png',
      isLoading: false,
      pokemonUrl: '',
      pokemonImg: '',
      showDetail: false,
      typeName: '',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
    };
  },
  methods: {
    fetchPokemonTypes() {
      this.isLoading = true;
      const typeUrl = 'https://pokeapi.co/api/v2/type';
      fetch(typeUrl)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            if (data.results) {
              this.pokemonTypes = data.results;
              this.pokemonTypes = this.pokemonTypes.filter(
                (type) => !['unknown', 'shadow'].includes(type.name),
              );
            }
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log('error: ', error);
          this.isLoading = false;
        });
    },
    fetchPokemonsFromType(urlForPokemonType) {
      if (urlForPokemonType) {
        fetch(urlForPokemonType)
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              console.log(data);
            }
          })
          .catch((error) => console.log(error));
      }
    },
    getTypePokemons(link) {
      if (link) {
        this.isLoading = true;
        fetch(link)
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((data) => {
            if (data) {
              if (data.pokemon) {
                this.pokemonsFromType = data.pokemon;
                this.pokemonsFromType = this.pokemonsFromType.map((p) => {
                  return {
                    name: p.pokemon.name,
                    id: this.getPokemonId(p.pokemon.url),
                    url: p.pokemon.url,
                    img:
                      `${this.imageUrl}${this.getPokemonId(
                        p.pokemon.url,
                      )}.png` !== null
                        ? `${this.imageUrl}${this.getPokemonId(
                            p.pokemon.url,
                          )}.png`
                        : this.noImg,
                  };
                });
              }
            }
            this.isLoading = false;
          })
          .catch((error) => {
            console.log('error: ', error);
            this.isLoading = false;
          });
      }
    },
    getPokemonId(url) {
      return Number(url.split('/')[6]);
    },
    sendPokemonDetail(id) {
      this.pokemonUrl = `${this.apiUrl}${id}`;
      this.showDetail = true;
    },
    closeDetail() {
      this.showDetail = false;
      this.pokemonUrl = null;
    },
  },
  created() {
    this.fetchPokemonTypes();
  },
};
</script>

<style scoped>
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  width: 100vw;
  max-width: 100%;
}

.btns .btn {
  padding: 0.5rem 0.7rem;
  border-radius: 5px;
  margin: 0.5rem;
  cursor: pointer;
  width: 4.5rem;
  height: 2rem;
  text-align: center;
  border: gray;
  background-color: rgb(233, 80, 80);
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
}

.btn:hover {
  color: black;
}

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

.center {
  font-weight: bold;
  text-align: center;
  padding-bottom: 0rem;
}

@media screen and (max-width: 640px) {
  .btns {
    margin: 2px;
  }
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
