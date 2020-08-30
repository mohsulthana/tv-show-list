<template>
  <div class="app-test">
    <TvShows msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TvShows from './components/TvShows.vue';
import './scss/components/app.scss';

export default {
  name: 'App',
  components: {
    TvShows,
  },
};
</script>
