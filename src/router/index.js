import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemons',
    name: 'Pokemons',
    component: () => import('../views/Pokemons.vue'),
  },
  {
    path: '/poketypes',
    name: 'Poketypes',
    component: () => import('../views/Poketypes.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
