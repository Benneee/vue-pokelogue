<template>
  <main class="backdrop">
    <article class="error-msg" v-if="pokemonData === null && !isLoading">
      <h2 class="error">Error!</h2>
      <h2>This pokemon was not found</h2>
    </article>
    <article class="detail" v-else>
      <div class="image">
        <img :src="pokemonImg" :alt="pokemonData.name" />
      </div>
      <div class="pokemon-data">
        <h2>{{ pokemonData.name }}</h2>
      </div>
      <div class="stats">
        <div class="col">
          <p>Base Experience</p>
        </div>
        <div class="col">
          <p>{{ pokemonData.base_experience }}XP</p>
        </div>
      </div>

      <div class="stats">
        <div class="col">
          <p>Height</p>
        </div>
        <div class="col">
          <p>{{ pokemonData.height / 10 }}m</p>
        </div>
      </div>

      <div class="stats">
        <div class="col">
          <p>Weight</p>
        </div>
        <div class="col">
          <p>{{ pokemonData.weight / 10 }}kg</p>
        </div>
      </div>

      <h3>Pokemon Types</h3>
      <div class="types">
        <div
          class="type"
          v-for="(value, index) in pokemonData.types"
          :key="'value' + index"
        >
          {{ value.type.name }}
        </div>
      </div>

      <h3>Abilities</h3>
      <div class="abilities">
        <div
          class="ability"
          v-for="(value, index) in pokemonData.abilities"
          :key="'value' + index"
        >
          {{ value.ability.name }}
        </div>
      </div>
      <h3>Stats</h3>
      <div class="powers">
        <label for="hp" class="col">HP:</label>
        <progress id="hp" max="100" :value="hp"> {{ hp }}% </progress>

        <label for="attack" class="col">Attack:</label>
        <progress id="attack" max="100" :value="attack"></progress>

        <label for="defense" class="col">Defense:</label>
        <progress id="defense" max="100" :value="defense"></progress>

        <label for="speed" class="col">Speed:</label>
        <progress id="speed" :value="speed" max="100"></progress>
      </div>
    </article>
    <button class="close-btn" @click="$emit('closeDetail')">
      X
    </button>
  </main>
</template>

<script>
export default {
  name: 'Pokemon',
  props: {
    pokemonUrl: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      pokemonData: {},
      baseStats: [],
      pokemonImg: '',
      isLoading: false,
      hp: '',
      attack: '',
      defense: '',
      speed: '',
    };
  },
  methods: {
    fetchPokemonData() {
      if (!this.pokemonUrl !== null) {
        fetch(this.pokemonUrl)
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              this.pokemonData = null;
            }
          })
          .then((data) => {
            this.isLoading = true;
            if (data) {
              this.pokemonData = data;
              this.pokemonImg = data.sprites.front_default;
              this.baseStats = [...data['stats']];
              this.baseStats.map((stat) => {
                switch (stat.stat.name) {
                  case 'hp':
                    this.hp = stat['base_stat'];
                    break;
                  case 'attack':
                    this.attack = stat['base_stat'];
                    break;
                  case 'defense':
                    this.defense = stat['base_stat'];
                    break;
                  case 'speed':
                    this.speed = stat['base_stat'];
                    break;
                  case 'special-attack':
                    this.specialAttack = stat['base_stat'];
                    break;
                  case 'special-defense':
                    this.specialDefense = stat['base_stat'];
                    break;
                }
                return this.baseStats;
              });
            }
            this.isLoading = false;
          })
          .catch((error) => {
            this.isLoading = false;
            this.pokemonData = null;
            console.log('error: ', error);
          });
      }
    },

    objectHasData(obj) {
      if (obj !== null || obj !== undefined) {
        if (Object.keys(obj).length > 0) {
          return true;
        }
      }
    },
  },

  created() {
    this.fetchPokemonData();
  },
};
</script>

<style scoped>
.backdrop {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  padding: 90px 10px 10px;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  background: rgba(0, 0, 0, 0.7);
}

.backdrop .detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  bottom: 3.5rem;
  padding: 1.5rem;
  width: 30vw;
  border-radius: 5px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    90deg,
    rgba(178, 178, 185, 1) 11%,
    rgb(173, 136, 136) 51%,
    rgb(177, 174, 42) 84%
  );
}

.backdrop .detail .image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -3rem;
  width: 7rem;
  height: 7rem;
  background-color: rgb(248, 228, 228);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
}

.pokemon-data {
  color: #fff;
  margin-top: 1rem;
}

.pokemon-data h2 {
  text-transform: capitalize;
  border-bottom: 4px solid #fff;
}

.stats {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.stats .col {
  flex: 50%;
  padding: 0.1rem;
}

.type {
  color: #fff;
}

.types,
.abilities {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 90%;
  max-width: 400px;
}

h3 {
  color: #fff;
  border-bottom: 4px solid #fff;
}

.type,
.ability {
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: capitalize;
  word-wrap: none;
  word-break: keep-all;
}

.type {
  background-color: #0a2e50;
}
.ability {
  background-color: #c73015;
}

.close-btn {
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #efefef;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  cursor: pointer;
}

.powers {
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.powers .col {
  flex: 50%;
  padding: 0.1rem;
}

.error-msg {
  background: #fff;
  color: #333;
  padding: 1rem;
}
.error {
  color: red;
  text-align: center;
  font-weight: bold;
}
@media screen and (max-width: 640px) {
  .backdrop .detail {
    width: 100vw;
    bottom: 1.3rem;
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: 0.3rem;
  }

  .backdrop .detail .image {
    top: -5rem;
  }

  .type,
  .ability {
    font-size: 0.7rem;
  }

  .detail {
    padding: 1rem;
  }

  h2 {
    font-size: 1rem;
  }

  h3 {
    font-size: 0.9rem;
  }
  p {
    margin: 0;
    padding: 0;
  }
}
</style>
