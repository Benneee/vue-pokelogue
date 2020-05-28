<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
#app {
  font-family: 'Josefin Sans', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav .title a.router-link-exact-active,
.nav .links a.router-link-exact-active {
  text-decoration: underline;
}
</style>
