// Milestone 3:
//1. In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) per poi aggiungere la parte finale dell’URL passata dall’API.
// Esempio di URL: https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
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
