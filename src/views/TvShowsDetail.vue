<template>
  <div class="hello">
    <h1>Shows</h1>
    <b-card
    :title="movie.title"
    :img-src="movie.image.medium"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    >
    <b-card-text>
        Rating : {{ movie.rating.average }}
    </b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TvShows',
  data: () => ({
    movie: [],
  }),
  props: {
    msg: String,
  },
  mounted() {
    this.fetchShows();
  },
  methods: {
    fetchShows() {
      const { id } = this.$route.params;
      axios.get(`http://api.tvmaze.com/shows/${id}`)
        .then((response) => {
          this.movie = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
