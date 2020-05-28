<template>
  <header class="nav">
    <div class="title">
      <router-link to="/">Vue-Pokelogue</router-link>
      <img src="https://img.icons8.com/color/36/000000/pikachu-pokemon.png" />
    </div>

    <div class="links">
      <router-link to="/pokemons">Pokemons</router-link>
      <router-link to="/poketypes">Poketypes</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.nav {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(255, 249, 0, 1) 40%,
    rgba(2, 0, 36, 1) 30%,
    rgba(163, 27, 27, 1) 29%
  );
  padding: 1rem;
  color: #fff;
  display: flex;
  cursor: pointer;
}

.nav .title {
  font-size: 1.5rem;
  align-items: center;
}

.nav .title a {
  text-decoration: none;
  color: #333;
}

.nav .links {
  display: flex;
  align-items: center;
  margin-left: auto;
  order: 2;
}

.nav .links a {
  margin-right: 1rem;
  text-decoration: none;
  color: #fff;
}

@media screen and (max-width: 670px) {
  .nav {
    padding: 0.7rem;
  }

  .nav .title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .nav .title img {
    height: 24px;
    width: 24px;
  }

  .nav .links {
    font-size: 0.8rem;
  }
}
</style>
