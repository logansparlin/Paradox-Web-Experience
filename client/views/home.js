Template.home.rendered = function() {
	$(window).scroll(function(e) {
		e.preventDefault();
	})
	var index = 0,
		section = $('section'),
		pager = $('.slide-navigation ul li');
		h1 = $('.active-slide h1')

	Session.set('index', index)

	this.autorun(function() {
		var data = Session.get('index');
		pager.eq(index).addClass('active')
		section.eq(index -1).removeClass('active-slide')
		section.eq(index).addClass('active-slide')
	})

	function checkIndex(index) {
		if(index < 0) {
			index = (section.length - 1)
			Session.set('index', (section.length - 1))
			alert(index)
		} else if(index > (section.length - 1 )) {
			index = 0
			Session.set('index', 0)
			alert(index)
		} 
	}

	// Previous and Next
	var detectDirection = function(event, delta) {
		event.preventDefault();
		// var delta = event.originalEvent.delta;
		section.removeClass('active-slide')
		if(delta < 0) {
			// next
			$('body').removeClass('previous')
			$('body').addClass('next')
			$('section').removeClass('hidden')
			$('section').eq(index).addClass('hidden')


			pager.eq(index).removeClass('active')
			if(index >= (section.length - 1)) {
				index = index = 0
			} else {
				index += 1
			}
			Session.set('index', index)
			console.log('next')
		}
		else if(delta > 0) {
			// previous
			$('body').removeClass('next')
			$('body').addClass('previous')
			section.removeClass('hidden')
			pager.eq(index).removeClass('active')
			if(index <=0) {
				index = (section.length - 1)
			} else {
				index -= 1
			}
			Session.set('index', index)
			console.log('previous')
		}
	}
	var changeData = _.debounce(detectDirection, 50, true);
	$('body').on('mousewheel', changeData)
}