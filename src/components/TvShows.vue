/* eslint-disable max-len */
<template>
  <div class="hello">
    <h1>Search</h1>
      <b-form-input v-model="searchQuery"
      @keyup="searchMovie" placeholder="Enter your search keyword"></b-form-input>
      <div v-for="show in filteredResult" :key="show.id">
      <b-card
        :title="show.show.name"
        :img-src="show.show.image.medium"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          Rating : {{ show.show.rating.average }}
        </b-card-text>
        <b-button
          tag="router-link"
          target="_blank"
          :to="`/show-detail/${show.show.id}`"
          variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
    <hr>
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
    result: [],
    featuredMovies: [],
    searchQuery: '',
  }),
  props: {
    msg: String,
  },
  mounted() {
    this.fetchShows();
    this.fetchGenres();
  },
  computed: {
    filteredResult() {
      let { result } = this;
      const { searchQuery } = this;

      if (!searchQuery) {
        return result;
      }

      result = result.filter((item) => item);
      return result;
    },
  },
  methods: {
    searchMovie() {
      axios.get(`http://api.tvmaze.com/search/shows?q=${this.searchQuery}`)
        .then((response) => {
          this.result = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // filteredShows() {
    //   const reqOne = `http://api.tvmaze.com/shows?genre=${this.genres[0]}`;
    //   const reqTwo = `http://api.tvmaze.com/shows?genre=${this.genres[1]}`;
    //   const reqThree = `http://api.tvmaze.com/shows?genre=${this.genres[2]}`;
    //   const reqFour = `http://api.tvmaze.com/shows?genre=${this.genres[3]}`;

    //   const promise1 = axios.get(reqOne);
    //   const promise2 = axios.get(reqTwo);
    //   const promise3 = axios.get(reqThree);
    //   const promise4 = axios.get(reqFour);

    //   axios.all([promise1, promise2, promise3, promise4])
    //     .then(axios.spread((...response) => {
    //       console.log(response);
    //     }))
    //     .catch((error) => {
    //       console.error(error);
    //     });

    //   // axios.get(`http://api.tvmaze.com/shows?genre=${this.genres[0]}`)
    // },
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
          // this.$nextTick(() => {
          //   this.filteredShows();
          // });
        })
        .catch((error) => {
          console.error(error);
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
