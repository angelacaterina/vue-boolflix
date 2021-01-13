// Milestone 3:
//1. In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) per poi aggiungere la parte finale dell’URL passata dall’API.
// Esempio di URL: https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
let app = new Vue({
  el: '#app',
  data: {
    filmList:[],
    tvList:[],
    search: "",
  },
  methods:{
    searchFilm(search){ //M1.2 click bottone/enter visualizzazione film cercati
      axios.get("https://api.themoviedb.org/3/search/movie?api_key=86bb545f744dd070033b13d7b308cad5&query=" + search)
      .then(resp => {
        console.log(resp.data.results);
        this.filmList = resp.data.results;
        //M2.1 Trasformiamo il voto da decimale in un numero intero da 1 a 5, arrotondamento per eccesso
        this.filmList.forEach(element => {
          let voteIntCeil = Math.ceil((element.vote_average)/2);
          element.vote_average = voteIntCeil;
          // console.log(voteIntCeil);
          // console.log(element.original_language);

          //M2.2 Trasformiamo la stringa statica della lingua in una bandiera della nazione corrispondente
          if(element.original_language == "en"){
            element.original_language = "gb";
          }else if(element.original_language == "zh"){
            element.original_language = "cn";
          }else if(element.original_language == "ko"){
            element.original_language = "kr";
          }else if(element.original_language == "vi"){
            element.original_language = "vn";
          }else if(element.original_language == "hu" || "et"){
            element.original_language = "eu";
          }else if(element.original_language == "ja"){
            element.original_language = "jp";
          }else if(element.original_language == "da"){
            element.original_language = "dk";
          }
        });
      })

      //M2.3 Allarghiamo poi la ricerca anche alle serie tv.
      axios.get("https://api.themoviedb.org/3/search/tv?api_key=86bb545f744dd070033b13d7b308cad5&query=" + search)
      .then(resp => {
        console.log(resp.data.results);
        this.tvList = resp.data.results;
        //M2.1 Trasformiamo il voto da decimale in un numero intero da 1 a 5, arrotondamento per eccesso
        this.tvList.forEach(element => {
          let voteIntCeil = Math.ceil((element.vote_average)/2);
          element.vote_average = voteIntCeil;
          // console.log(voteIntCeil);
          // console.log(element.original_language);

          //M2.2 Trasformiamo la stringa statica della lingua in una bandiera della nazione corrispondente
          if(element.original_language == "en"){
            element.original_language = "gb";
          }else if(element.original_language == "zh"){
            element.original_language = "cn";
          }else if(element.original_language == "ko"){
            element.original_language = "kr";
          }else if(element.original_language == "vi"){
            element.original_language = "vn";
          }else if(element.original_language == "hu" || "et"){
            element.original_language = "eu";
          }else if(element.original_language == "ja"){
            element.original_language = "jp";
          }else if(element.original_language == "da"){
            element.original_language = "dk";
          }
        });
      })
    }
  }
})
