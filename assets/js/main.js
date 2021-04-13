Vue.config.devtools = true;

let app = new Vue({
    el: "#root",
    data: {
        uri: "https://api.themoviedb.org/3",
        api_key: "c3f5703c26f5de5b9e058f16544de17b",
        films: [],
        tvSeries: [],
        searchFilm: "",
        toggleFilmsSeries: true,
        toggleOpenFilter: false,
        categories: []
    },
    methods: {
        mariello() {
            axios.get(`${this.uri}/search/movie?api_key=${this.api_key}&query=${this.searchFilm}`)
                .then((response) => {
                    this.films = response.data.results
                });
            axios.get(`${this.uri}/search/tv?api_key=${this.api_key}&query=${this.searchFilm}`)
                .then((response) => {
                    this.tvSeries = response.data.results
                });
        },
        stars(vote) {
            let splitVote = vote.vote_average / 2
            let star = Math.round(splitVote)
            return Number(star)
        },
        toggleFilmSerie() {
            this.toggleFilmsSeries = !this.toggleFilmsSeries

        },
        openFilter() {
            this.toggleOpenFilter = !this.toggleOpenFilter
        }
    },
    mounted() {
        axios.get(`${this.uri}/genre/movie/list?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.categories = response.data.genres
                console.log(this.categories);
            });

    },
    computed: {},
    created() {},
})