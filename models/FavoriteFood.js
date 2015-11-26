var keystone = require('keystone');
var Types = keystone.Field.Types;

var FavoriteFood = new keystone.List('FavoriteFood', {});

FavoriteFood.add({
  name: {type: Types.Name, required: true, initial: true},
  email: {type: Types.Email, required: true, initial: true},
  food: {type: String, required: true, initial: true}
});

FavoriteFood.defaultColumns = 'name, food, email';
FavoriteFood.register();
