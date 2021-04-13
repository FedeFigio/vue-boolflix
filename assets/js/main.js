Vue.config.devtools = true;

let app = new Vue({
    el: "#root",
    data: {
        uri: "https://api.themoviedb.org/3",
        api_key: "c3f5703c26f5de5b9e058f16544de17b",
        films: null,
        tvSeries: null,
        filmsPopular: [],
        tvSeriesPopular: [],
        searchFilm: "",
        toggleFilmsSeries: true,
        toggleOpenFilter: false,
        categoriesMovie: [{
            "id": null,
            "name": "All"
        }],
        categoriesSeries: [{
            "id": null,
            "name": "All"
        }],
        indexCategory: 0
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
            this.indexCategory = 0

        },
        openFilter() {
            this.toggleOpenFilter = !this.toggleOpenFilter
        },
        selectCategorie(index) {
            this.indexCategory = index

        },

    },
    mounted() {
        axios.get(`${this.uri}/genre/movie/list?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.categoriesMovie = [...this.categoriesMovie, ...response.data.genres]
            });
        axios.get(`${this.uri}/genre/tv/list?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.categoriesSeries = [...this.categoriesSeries, ...response.data.genres]
            });

        axios.get(`${this.uri}/tv/popular?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.tvSeriesPopular = response.data.results
            });
        axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.filmsPopular = response.data.results
            });
    },
    computed: {

    },
})


// pippo() {
//     this.filmsPopular = []
//     axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}&query=${this.searchFilm}`)
//         .then((response) => {
//             let list = response.data.results
//             for (let i = 0; i < list.length; i++) {
//                 const element = list[i];
//                 if (element.genre_ids.includes(this.categoriesMovie[this.indexCategory].id)) {
//                     console.log(response.data.results);
//                     this.filmsPopular.push(response.data.results[i])
//                 }
//             }
//         });
// }