/* eslint-disable max-len */
<template>
  <div class="hello">
    <h1>Filtered Shows</h1>
    <div v-for="genre in genres" :key="genre.index">
      {{genre}}
      <!-- {{featuredMovies}} -->
    </div>
    <hr>
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
        <b-button
          tag="router-link"
          target="_blank"
          :to="`/show-detail/${show.id}`"
          variant="primary">Go somewhere</b-button>
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
    genres: [],
    featuredMovies: [],
  }),
  props: {
    msg: String,
  },
  mounted() {
    this.fetchShows();
    this.fetchGenres();
  },
  methods: {
    filteredShows() {
      this.genres.forEach((value) => {
        axios.get(`http://api.tvmaze.com/shows?genres=${value}`)
          .then((resp) => {
            const data = resp.data.splice(0, 4);
            this.featuredMovies.push(data);
            // debugger;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    fetchGenres() {
      axios.get('http://api.tvmaze.com/shows')
        .then((response) => {
          const genreResp = [];
          response.data.forEach((value) => {
            value.genres.forEach((val) => {
              genreResp.push(val);
            });
          });
          this.genres = [...new Set(genreResp)];
          this.genres = this.genres.splice(0, 4);
          console.log(this.genres);
          this.$nextTick(() => {
            this.filteredShows();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
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
