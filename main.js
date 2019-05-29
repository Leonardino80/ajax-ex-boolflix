$(document).ready(function(){

  var api_url_base = 'https://api.themoviedb.org/3/';

  var source = $('#template_scheda').html();
  var template_function = Handlebars.compile(source);

  $('#ricerca').click(function(){
    $('#locandine').html('');
    var richiesta = $('#request').val();
    console.log(richiesta);

    $.ajax({
    	'url': api_url_base + 'search/movie',
    	'data': {
      	'api_key' : 'e1a570909ce0a6c2e9851825c79f7b37',
      	'query' : richiesta,
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
          var lingua = movie.original_language;
          var voto = movie.vote_average;
          var voto_ridotto =  arrotonda_voto(voto);
          var voto_in_stelle = stellette(voto_ridotto)
          var handlebars_variable = {
            'title' : titolo,
            'original_title' : titolo_originale,
            'language' : lingua,
            'rating' : voto_in_stelle,
            'rating_numerico' : voto
          }
          var html_locandina = template_function(handlebars_variable);
          $('#locandine').append(html_locandina);
        }
    	},
    	'error':function(){
      	alert('si è verificato un errore');
    	}
    });

  })

  function arrotonda_voto(voto){
    var voto_arrotondato = Math.ceil(voto/2);
    return voto_arrotondato;
  }

  function stellette(stelle){
    var stelline;
    switch ( stelle ) {

      case 0:
        stelline = "-";
        break;
      case 1:
        stelline = '<i class="fas fa-star"></i>';
        break;
      case 2:
        stelle = '<i class="fas fa-star"></i><i class="fas fa-star"></i>';
        break;
      case 3:
        stelline = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
        break;
      case 4:
        stelline = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
        break;
      case 5:
        stelline = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
        break;
    }
    return stelline;
  }

})
