Template.home.events({
	'click .slide-navigation li': function(e) {
		var index = $(e.target).index()
		Session.set('index', index)
	},
	'click .to-top-container': function(e) {
		Session.set('index', 0)
	},
	'click button.next': function() {
		var index = Session.get('index')
		if(index <= ($('section').length - 2)) {
			Session.set('index', (index + 1))
		}
	},
	'click button.previous': function() {
		var index = Session.get('index')
		if(index >=1) {
			Session.set('index', (index - 1))
		}
	}
})

Template.home.rendered = function() {
	Session.set('activeVideo', null);
	var index = 0,
		section = $('section'),
		pager = $('.slide-navigation ul li');
		h1 = $('.active-slide h1')

	Session.set('index', index)


	// Updates every time index changes
	this.autorun(function() {
		var data = Session.get('index');
			index = data,
			body = $('body');

		if(index == 0) {
			body.addClass('first-slide--active')
		} else if(index == (section.length - 1)) {
			body.addClass('last-slide--active')
		} else {
			body.removeClass('first-slide--active last-slide--active')
		}

		section.removeClass('active-slide previous next')
		pager.removeClass('active')
		section.addClass('hidden')
		pager.eq(index).addClass('active')
		section.eq(index -1).removeClass('active-slide').addClass('previous')
		section.eq(index + 1).addClass('next')
		section.eq(index).addClass('active-slide').removeClass('hidden')
		if(index >= (section.length - 1)) {
			var mouse = $('.mouse-icon-container'),
				top = $('.to-top-container');
			TweenMax.to(mouse, 0.5, {opacity: 0})
			TweenMax.to(top, 0.5, {opacity: 1, delay: 1})
		} else {
			var mouse = $('.mouse-icon-container'),
				top = $('.to-top-container');
			TweenMax.to(mouse, 0.5, {opacity: 1, delay: 1})
			TweenMax.to(top, 0.5, {opacity: 0})
		}
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
		if($('body').hasClass('menu--active')) {
			// Do nothing
		} else {
			// var delta = event.originalEvent.delta;
			if(delta < 0) {
				// next

				if(index >= (section.length - 1)) {
					index = index
				} else {
					index += 1
				}
				Session.set('index', index)
				console.log('next')
			}
			else if(delta > 0) {
				// previous
				if(index <=0) {
					index = index
				} else {
					index -= 1
				}
				Session.set('index', index)
				console.log('previous')
			}
		}
	}
	var changeData = _.debounce(detectDirection, 300, true);
	$('body').on('mousewheel', changeData)
}

Template.layout.rendered = function() {
	$(window).imagesLoaded(function() {
		var loader = $('.loading-container')
		TweenMax.fromTo( loader, 1.2, {x: 0}, {x: '-100%', force3D: true, autoRound: false, onComplete: hide, delay: 1.5, ease: Quart.easeOut})
		function hide() {
			loader.css('display', 'none')
		}
	})
}