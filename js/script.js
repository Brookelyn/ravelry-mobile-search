$(document).ready(function() {

	/* Setting up Masonry */	

	var results = $('#results');


	// initialize
	
	results.masonry({
		itemSelector: '.search-result',

	});

	// layout Masonry again after all images have loaded
	var layout = function() { 
		results.imagesLoaded(function() {
			setTimeout(function(){
				results.masonry();
			}, 500);
		});	
	};





	/* Search bar */

	$('.search-bar').submit(function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var patterns = $(this).find("input[name='pattern']").val();
		getPatterns(patterns);
	});


	/* Reset input field */


	

	/* Connection through proxy to allow me to search */

	var getPatterns = function(result){

	    var result = $.ajax({
	    	url: 'http://localhost:8080/api/search/' + result + '/0/100',
		    type:'GET',
		    dataType: "json"
		   
	    })
	    .done(function (result) {
		    console.log(result);
		    $.each(result.patterns, function(i, item) {
		    	var searchResults =  displayPatternResults(item);
		    	$('.results').append(searchResults);
		    	var resetForm = document.getElementById('form');
		    	resetForm.reset();
		    	layout();
		    });
	    })   
	}




	/* Displaying pattern results */

	var displayPatternResults = function(result) {

		// Clone template
		var pattern = $('.template .search-result').clone();

		// Set pattern name
		var patternName = pattern.find('.project-name');
		patternName.text(result.name);

		// Set pattern designer
		var designer = pattern.find('.designer');
		designer.text(result.designer.name);

		// Set link to pattern
		var patternLink = pattern.find('.pattern-link');
		patternLink.attr('href', 'http://www.ravelry.com/patterns/library/' + result.permalink);

		//Set image
		var patternPic = pattern.find('.pattern-picture');
		patternPic.attr('src', result.first_photo.small_url);
		patternPic.attr('alt', 'Picture of ' + result.name)


		return pattern;
	}









































});

