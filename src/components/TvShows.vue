<template>
  <div class="hello">
    <h1>Shows</h1>
    <div v-for="show in movies" :key="show.id">
      <b-card
        :title="show.title"
        :img-src="show.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Rating : {{ show.rating }}
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
          response.data.forEach((value) => {
            this.movies.push({ title: value.name });
            this.movies.push({ image: value.image.medium });
            this.movies.push({ rating: value.rating.average });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
