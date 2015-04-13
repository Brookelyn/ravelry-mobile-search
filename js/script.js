$(document).ready(function() {

	/* Setting up Masonry */	

	var results = $('#results');
	// initialize
	results.masonry({
	  columnWidth: '.search-result',
	  itemSelector: '.search-result'
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

	showHideExtended();

});


/* Show/hide extended info */

var showHideExtended = function(document) {
	$('.search-result').click(function() {
        $(this).find('> .extended').slideToggle("fast");
    });

};

