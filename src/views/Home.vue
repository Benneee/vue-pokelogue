<template>
  <div class="home">
    <div class="card">
      <h1>Welcome to Pokelogue</h1>

      <p>
        Find a collection of all Pokemons available by navigating to
        <router-link to="/pokemons">Pokemons</router-link>
      </p>

      <p>
        Find a collection of Pokemon By Types by navigating to
        <router-link to="/poketypes">Poketypes</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.home {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('http://pngimg.com/uploads/pokemon/pokemon_PNG33.png');
  background-repeat: no-repeat;
}

.card {
  width: 50vw;
  text-align: center;
  height: 20vh;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(182, 11, 11, 0.2);
  transition: 0.3s;
  background-color: rgb(243, 235, 235);
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 648px) {
  .home {
    display: flex;
    flex-direction: column;
    background-image: url('http://pngimg.com/uploads/pokemon/pokemon_PNG33.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .card {
    width: 80vw;
    height: 28vh;
  }
}

.card h1 {
  font-size: 1.5rem;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>
