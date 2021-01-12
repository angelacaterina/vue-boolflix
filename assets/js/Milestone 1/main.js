// Milestone 1:
//1. Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
//2. cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
//3. Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato: 1. Titolo, 2. Titolo Originale, 3. Lingua, 4. Voto
let app = new Vue({
  el: '#app',
  data: {
    filmList:[],
    search: "",
  },
  methods:{
    searchFilm(search){ //M1.2 click bottone/enter visualizzazione film cercati
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=86bb545f744dd070033b13d7b308cad5&language=en-US&query=" + search)
      .then(resp => {
        console.log(resp.data.results);
        this.filmList = resp.data.results;
      })
    }
  }
})
