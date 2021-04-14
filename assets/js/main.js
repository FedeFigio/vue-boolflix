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
        togglePreview: {
            bool: false,
            index: null,
            film: null
        },
        categoriesMovie: [],
        categoriesSeries: [],
        indexCategory: 0,
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
        openPreview(index, film) {
            this.togglePreview.bool = !this.togglePreview.bool
            this.togglePreview.index = index
            this.togglePreview.film = film

        },
        openFilter() {
            this.toggleOpenFilter = !this.toggleOpenFilter
        },
        selectCategorie(index) {
            this.indexCategory = index
        },

        filterCategoryFilm(id) {
            return this.filmsPopular.filter((film) => {
                return film.genre_ids.includes(id)
            }).slice(0, 5)

        },
        filterCategorySeries(id) {
            return this.tvSeriesPopular.filter((film) => {
                return film.genre_ids.includes(id)
            }).slice(0, 5)
        }
    },
    mounted() {
        axios.get(`${this.uri}/genre/movie/list?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.categoriesMovie = response.data.genres
            });
        axios.get(`${this.uri}/genre/tv/list?api_key=${this.api_key}&query=${this.searchFilm}`)
            .then((response) => {
                this.categoriesSeries = response.data.genres
            });


        for (let i = 0; i < 50; i++) {
            axios.get(`${this.uri}/movie/popular?api_key=${this.api_key}&query=${this.searchFilm}&page=${i + 1}`)
                .then((response) => {
                    this.filmsPopular = [...this.filmsPopular, ...response.data.results]
                });
        }


        for (let i = 0; i < 50; i++) {
            axios.get(`${this.uri}/tv/popular?api_key=${this.api_key}&query=${this.searchFilm}&page=${i + 1}`)
                .then((response) => {
                    this.tvSeriesPopular = [...this.tvSeriesPopular, ...response.data.results]
                });
        }

    },
    computed: {},
    watch() {}
})