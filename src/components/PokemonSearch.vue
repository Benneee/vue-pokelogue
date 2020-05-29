<template>
  <div class="search-area">
    <form>
      <input type="text" v-model="searchValue" required />
      <i
        class="fas fa-search"
        @click.prevent="$emit('search', searchValue)"
      ></i>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PokemonSearch',
  data: () => {
    return {
      searchValue: '',
    };
  },
  methods: {},
};
</script>

<style scoped>
.search-area {
  margin-top: 0.5rem;
}

.search-area form input {
  padding: 0.3rem;
  font-size: 1rem;
  width: 30vw;
}

.search-area form i {
  font-size: 1.3rem;
  margin-left: 5px;
  cursor: pointer;
}
</style>
