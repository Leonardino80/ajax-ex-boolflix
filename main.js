$(document).ready(function(){

  var api_url_base = 'https://api.themoviedb.org/3/';

  var source = $('#template_scheda').html();
  var template_function = Handlebars.compile(source);

  $('#ricerca').click(function(){
    $('#locandine').html('');
    var richiesta = $('#request').val();
    chiamata_ajax(richiesta);
  })

  $('#request').keyup(function(event){
    if (event.which == 13) {
      $('#locandine').html('');
      var richiesta = $('#request').val();
      chiamata_ajax(richiesta);
    }
  })

  function arrotonda_voto(voto){
    var voto_arrotondato = Math.ceil(voto/2);
    return voto_arrotondato;
  }

  function disegna_stelle(stelline_length){
    var stelline = '<i class="fas fa-star"></i>';
    var stelline_vuote = '<i class="far fa-star"></i>';
    var result = '';
    for (var i = 0; i < 5; i++) {
      if (i < stelline_length) {
        result = result.concat(stelline);
      } else{
        result = result.concat(stelline_vuote);
      }
    }
    return result
  }

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

        for (var i = 0; i < movies.length; i++) {
          var movie = movies[i];
          var titolo = movie.title;
          var titolo_originale = movie.original_title;
          var lingua = disegna_bandiere(movie.original_language);
          var voto = movie.vote_average;
          var voto_ridotto =  arrotonda_voto(voto);
          var voto_in_stelle = disegna_stelle(voto_ridotto);
          var handlebars_variable = {
            'title' : titolo,
            'original_title' : titolo_originale,
            'language' : lingua,
            'rating' : voto_in_stelle,
          }
          var html_locandina = template_function(handlebars_variable);
          $('#locandine').append(html_locandina);
        }
    	},
    	'error':function(){
      	alert('si è verificato un errore');
    	}
    });

  }



})
