$(document).ready(function(){

  var api_url_base = 'https://api.themoviedb.org/3/';
  var img_url_base = 'https://image.tmdb.org/t/p/';
  var dimensione_poster = 'w185';

  var source = $('#template_scheda').html();
  var template_function = Handlebars.compile(source);

  $('#ricerca').click(function(){
    // ricerca si attiva al click sul pulsante
    $('#locandine').html('');
    var richiesta = $('#request').val();
    chiamata_ajax(richiesta);
  })

  $('#request').keyup(function(event){
    if (event.which == 13) {
      // ricerca si attiva al tasto invio dell input
      $('#locandine').html('');
      var richiesta = $('#request').val();
      chiamata_ajax(richiesta);
    }
  })

  function arrotonda_voto(voto){
    // dal voto decimale arrivo al numero di stelline
    var voto_arrotondato = Math.ceil(voto/2);
    return voto_arrotondato;
  }

  function disegna_stelle(stelline_length){
    var stelline = '<i class="fas fa-star"></i>';
    var stelline_vuote = '<i class="far fa-star"></i>';
    var result = '';
    // 5 perchè 5 sono le stelle
    for (var i = 0; i < 5; i++) {
      // if per stampare le stelle vuote oltre il voto fino a 5
      if (i < stelline_length) {
        result = result.concat(stelline);
      } else{
        result = result.concat(stelline_vuote);
      }
    }
    return result
  }

  // funzione per assegnare ad ogni lingua
  // (tra quelle previste nello switch) la sua bandiera,
  // se nn c'è rimane la sigla
  function disegna_bandiere(lang){
    var result ;

    switch ( lang ) {
      case 'it':
        result = '<img class="bandiere" src="' + lang + '.png">'
        break;
      case 'en':
        result = '<img class="bandiere" src="' + lang + '.png">'
        break;
      case 'ko':
        result = '<img class="bandiere" src="' + lang + '.png">'
        break;
      case 'de':
        result = '<img class="bandiere" src="' + lang + '.png">'
        break;
      case 'fr':
        result = '<img class="bandiere" src="' + lang + '.png">'
        break;
      default:
        result = lang;
        break;
    }
    return result;
  }

  function chiamata_ajax(testo_input){
// funziona che effettua chiamata ajax per i film
//ricevo come rispota un array di oggetti film
    $.ajax({
    	'url': api_url_base + 'search/movie',
    	'data': {
      	'api_key' : 'e1a570909ce0a6c2e9851825c79f7b37',
      	'query' : testo_input,
        'language' : 'it'
    	},
    	'method':'GET',
    	'success': function(data_response){
      	var movies = data_response.results;
        console.log(movies);
        // funzione per stampare i film tramite handlebars
        stampa_film (movies);
    	},
    	'error':function(){
      	alert('si è verificato un errore');
    	}
    });

    $.ajax({
    	'url': api_url_base + 'search/tv',
    	'data': {
      	'api_key' : 'e1a570909ce0a6c2e9851825c79f7b37',
      	'query' : testo_input,
        'language' : 'it'
    	},
    	'method':'GET',
    	'success': function(data_response){
      	var series = data_response.results;
        series = adatta_serie(series);
        stampa_film (series);
    	},
    	'error':function(){
      	alert('si è verificato un errore');
    	}
    });


  }

  //funzione per adattare le serie (l'array delle serie) allo stesso formato dei film
  //perchè 2 campi (name e original name) son diversi, gli altri 2 uguali
  function adatta_serie (serie) {
    var serie_sistemate = [];
    for (var i = 0; i < serie.length; i++) {
      var nuova_serie ={
        'title' : serie[i].name,
        'original_title' : serie[i].original_name,
        'vote_average' : serie[i].vote_average,
        'original_language' : serie[i].original_language,
        'type' : 'serie TV',
        'image_cover' : serie[i].poster_path
      }
      serie_sistemate.push(nuova_serie);
    }
    return serie_sistemate;
  }

// funzione che uso sia per stampare i film sia le serie
  function stampa_film (movies){
    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];
      var titolo = movie.title;
      var titolo_originale = movie.original_title;
      var lingua = disegna_bandiere(movie.original_language);
      var voto = movie.vote_average;
      var voto_ridotto =  arrotonda_voto(voto);
      var voto_in_stelle = disegna_stelle(voto_ridotto);
      //per evitare i casi in qui il campo è vuoto
      if(typeof movie.type !=='undefined'){
        var tipo = movie.type;
      }
      if(movie.poster_path == null){
        var url_poster = 'image-not-available.jpg'
      } else{
        var url_poster = img_url_base + dimensione_poster + movie.poster_path;
      }

      // inizializzo le variabili di handlebars
      var handlebars_variable = {
        'title' : titolo,
        'original_title' : titolo_originale,
        'language' : lingua,
        'rating' : voto_in_stelle,
        'type' : tipo,
        'image_cover' : url_poster
      }
      var html_locandina = template_function(handlebars_variable);
      $('#locandine').append(html_locandina);
    }
  };

  $(document).on('mouseenter', '.contenitore_scheda', function(){
    $(this).children('img').addClass('hidden');
    $(this).children('.dati').addClass('active');
  });

  $(document).on('mouseleave', '.contenitore_scheda', function(){
    $(this).children('img').removeClass('hidden');
    $(this).children('.dati').removeClass('active');
  });


})
