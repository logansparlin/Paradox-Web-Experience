Template.home.rendered = function() {
	$(window).scroll(function(e) {
		e.preventDefault();
	})
	// Previous and Next
	var detectDirection = function(event, delta) {
		event.preventDefault();
		console.log($(event.target))
		// var delta = event.originalEvent.delta;
		if(delta < 0) {
			// next
			$('body').removeClass('previous')
			$('body').addClass('next')
			$('.landing').addClass('hidden')
			console.log('next')
		}
		else if(delta > 0) {
			// previous
			$('body').removeClass('next')
			$('body').addClass('previous')
			$('.landing').removeClass('hidden')
			console.log('previous')
		}
	}
	var changeData = _.debounce(detectDirection, 50, true);
	$('body').on('mousewheel', changeData)
}