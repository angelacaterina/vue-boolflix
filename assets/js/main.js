let app = new Vue({
  el: '#app',
  data: {
    search: "",
    movies:[],
    TVseries:[],
    flags: ["en"],
  },
  methods:{
    searchFilm(){ //M1.2 click bottone/enter visualizzazione film cercati
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=86bb545f744dd070033b13d7b308cad5&language=itIT&query=${this.search}&include_adult=false`)
      .then(resp => {
        console.log(resp.data.results);
        this.movies = resp.data.results;
      })

      //M2.3 Allarghiamo poi la ricerca anche alle serie tv.
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=86bb545f744dd070033b13d7b308cad5&language=it-IT&query=${this.search}&include_adult=false`)
      .then(resp => {
        console.log(resp.data.results);
        this.TVseries = resp.data.results;
      }),

      this.getLanguage(); //richiamo funzione per la lingua
    },
    //M2.1 Trasformiamo il voto da decimale in un numero intero da 1 a 5, arrotondamento per eccesso
    getVote(vote_average){
      let voteIntCeil = Math.ceil(vote_average/2);
      return voteIntCeil;
      // console.log(voteIntCeil);
    },
    //M2.2 Trasformiamo la stringa statica della lingua in una bandiera della nazione corrispondente
    getLanguage(){
      axios.get(`https://restcountries.eu/rest/v2/`)
      .then(resp => {
        console.log(resp);
        let flags = resp.data;
        console.log(flags)

        flags.forEach(element => {
          let lang= element.alpha2Code;
          this.flags.push(lang.toLowerCase());
          // console.log(lang);
        });
      })
    }
  }
})
