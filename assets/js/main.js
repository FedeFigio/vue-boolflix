Vue.config.devtools = true;

let app = new Vue({
    el: "#root",
    data: {
        films: [],
        searchFilm: "",
    },
    methods: {
        mariello() {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c3f5703c26f5de5b9e058f16544de17b&query=${this.searchFilm}`)
                .then((response) => {
                    this.films = response.data.results
                });
        }

    },
    mounted() {

    },
    computed: {


    },
    created() {

    },
})