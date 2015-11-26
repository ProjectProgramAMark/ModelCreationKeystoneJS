var keystone = require('keystone');
var FavoriteFood = keystone.list('FavoriteFood');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'favoritefood';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.favoriteFoodSubmitted = false;

	// On POST requests, add the Favorite Food item to the database
	view.on('post', { action: 'favoritefood' }, function(next) {

		var newFavoriteFood = new FavoriteFood.model(),
			updater = newFavoriteFood.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, food',
			errorMessage: 'There was a problem submitting your enquiry:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.favoriteFoodSubmitted = true;
			}
			next();
		});

	});

	view.render('favoritefood');

};
