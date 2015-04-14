Template.home.rendered = function() {
	$(window).scroll(function(e) {
		e.preventDefault();
	})
	var index = 0,
		section = $('section'),
		pager = $('.slide-navigation ul li');

	Session.set('index', index)

	Tracker.autorun(function() {
		var data = Session.get('index');
		pager.eq(index).addClass('active')
	})

	// Previous and Next
	var detectDirection = function(event, delta) {
		event.preventDefault();
		// var delta = event.originalEvent.delta;
		if(delta < 0) {
			// next
			$('body').removeClass('previous')
			$('body').addClass('next')
			$('section').removeClass('hidden')
			$('section').eq(index).addClass('hidden')


			pager.eq(index).removeClass('active')
			index = index += 1;
			Session.set('index', index)
		}
		else if(delta > 0) {
			// previous
			$('body').removeClass('next')
			$('body').addClass('previous')
			section.removeClass('hidden')
			pager.eq(index).removeClass('active')
			index = index -= 1;
			Session.set('index', index)
		}
	}
	var changeData = _.debounce(detectDirection, 50, true);
	$('body').on('mousewheel', changeData)
}