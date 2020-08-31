<template>
  <div class="hello">
    <h1>Shows</h1>
    <div v-for="show in movies" :key="show.id">
      <b-card
        :title="show.name"
        :img-src="show.image.medium"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Rating : {{ show.rating.average }}
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TvShows',
  data: () => ({
    movies: [],
  }),
  props: {
    msg: String,
  },
  mounted() {
    this.fetchShows();
  },
  methods: {
    fetchShows() {
      axios.get('http://api.tvmaze.com/shows')
        .then((response) => {
          this.movies = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
