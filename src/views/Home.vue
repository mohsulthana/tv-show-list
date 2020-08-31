<template>
  <div class="home">
    <TvShows msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TvShows from '@/components/TvShows.vue';

export default {
  name: 'Home',
  components: {
    TvShows,
  },
};
</script>
