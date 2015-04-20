$(document).ready(function() {

	/* Setting up Masonry */	

	var results = $('#results');
	// initialize
	results.masonry({
	  columnWidth: '.search-result',
	  itemSelector: '.search-result'
	});


	// layout Masonry again after all images have loaded
	results.imagesLoaded(function() {
		setTimeout(function(){
			results.masonry();
		}, 500);
		
	});



	/* Search bar */

	$('.search-bar').submit(function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var patterns = $(this).find("input[name='pattern']").val();
		getPatterns(patterns);
	});






	/* Hide extended info after page loads */

	$('.search-result').find('>.extended').slideToggle(1000);


	/* Show/hide extended info */

	var showHideExtended = function(document) {
		$('.search-result').click(function() {
	        $(this).find('> .extended').slideToggle("fast", function(){
	        	results.masonry();
	        });
	    })
	};

	showHideExtended();


	/* Connection through proxy to allow me to search */

	var getPatterns = function(result){

	    // TODO: Sort out paging parameters

	    

	    var result = $.ajax({
	    	url: 'http://localhost:8080/api/search/' + result + '/0/100',
		    type:'GET',
		    dataType: "json"
		   
	    })
	    .done(function (result) {
		    processArray();
		    console.log(result)
		    $.each(result.pattern_sources, function(i, item) {
		    	var searchResults =  displayPatternResults(item);
		    	$('.results-sontainer').append(searchResults);
		    });
	    })
	    
	}


	var displayPatternResults = function(result) {

		// Clone template
		var testing = $('.template .search-result').clone();

		// Set pattern name
		var patternName = testing.find('.project-name');
		patternName.text(result.pattern_sources.name);

		// Set pattern designer
		var designer = testing.find('.designer');
		designer.text(result.pattern_sources.author);

		// Set link to pattern
		var patternLink = testing.find('.search-result');
		var link = 'http://www.ravelry.com/patterns/sources/' + result.pattern_sources.permalink;
		patternLink.attr('href', link);

		//Set image
		var patternPic = testing.find('.pattern-picture');
		patternPic.attr('src', result.pattern_sources.shelf_image_path);



	}


var processArray = function(array) {
	for (var i = 0; i <= array.length; i += 1) {
		addItem(array[i]);
	}
};








































});

