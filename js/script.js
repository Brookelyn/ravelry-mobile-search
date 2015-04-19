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




	var getPatterns = function(patterns){

		// Access key: 3FCB9AFC6C5DE411E238
		// Secret key: RlRox/RlIPJXadFh1DO21hKGFQdUv5M+22/v72yg


		/* Setting parameters */
		var parameters = {
		username: '3FCB9AFC6C5DE411E238',
		password: 'GC9bnXcG52OFhbuGyCn4M3QBxmVYrbqht-3iYGIm',
		};
		url = 'https://api.ravelry.com/current_user.json'


		$.getJSON(url, parameters, function(data){
			//showResults(data.items);
			console.log(data);
		});
	}





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












































});

