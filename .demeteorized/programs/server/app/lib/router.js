(function(){Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {
	name: 'home',
	onBeforeAction: function() {
		this.render('home')
		this.render('header', {to: 'header'})
	}
})

})();
