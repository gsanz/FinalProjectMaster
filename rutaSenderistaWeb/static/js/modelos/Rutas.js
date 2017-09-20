/**
* Define una colección de rutas
*/
var Rutas = Backbone.Collection.extend({
	    //url: 'http://localhost:8080/misrutas/rutas',
	    url: '/misrutas/rutas',
		model: Ruta,
		initialize: function() {
				this.on("add", function(model, col, opt) {
						console.log('Rutas:add ' + model.id);
						console.log(model);
						console.log(model.attributes.titulo);
						model.save();
				});
				this.on("remove", function(model, col, opt) {
						console.log('Rutas:remove ' + model.id);
						console.log(model);
						console.log(model.attributes.titulo);
						model.destroy({silent:true});
				});
				this.on("change", function(model, opt) {
						console.log('Rutas:change ' + model.id);
						console.log(model);
						console.log(model.attributes.titulo);
						model.save();
				});
				this.fetch();
		}
});