var Ruta = Backbone.Model.extend({
	  //urlRoot: 'http://localhost:8080/misrutas/rutas',
	  urlRoot: '/misrutas/rutas',
	  initialize: function() {
	  		console.log("getALLRoutes");
			//if (!this.id) this.set('id', _.uniqueId());
			if (!this.has("posiciones")) this.set('posiciones', []);
			if (!this.has("fecha")) this.set('fecha', Date());
	   },
       defaults: {
              titulo: 'Undefined',
              visible: 'on',
              color: '#000000',
        },
});