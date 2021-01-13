// Milestone 2:
//1. Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome). Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
//2. Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//3. Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv: https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs
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
