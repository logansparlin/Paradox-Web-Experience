Template.header.events({
	'click .menu-icon': function() {
		$('body').toggleClass('menu--active')
		if($('body').hasClass('menu--active')) {
			GAnalytics.pageview('About');
			GAnalytics.event("open", "menu")
		} else {
			GAnalytics.event("close", "menu")
		}
	}
})