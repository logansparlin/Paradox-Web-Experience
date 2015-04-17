Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', {
	name: 'home',
	onBeforeAction: function() {
		GAnalytics.pageview('Home');
		this.render('home')
		this.render('header', {to: 'header'})
	}
})