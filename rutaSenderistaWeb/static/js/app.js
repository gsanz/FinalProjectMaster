var rutas = new Rutas();
var rutadb = new RutaDB();
console.log(" Titulo "+rutadb.getTitulo());
console.log(" Visible "+rutadb.getVisible());

$(document).on('pageinit', '#pgHome', function() {
	var vistaNuevaRuta = new NuevaRuta({collection: rutas, el: '#pgHome'});
});

$(document).on('pageinit', '#pgMisRutas', function() {
	var vistaEditarRuta = new EditarRuta({collection: rutas, el: '#pgEditarRuta'}); 
	var vistaListaRutas = new ListaRutas({collection: rutas, el: '#pnRutas'}); 
	vistaListaRutas.editarRuta(vistaEditarRuta);	
	});
	
$(document).on('pageinit', '#pgMapa', function() {
	var vistaMapa = new Mapa({collection: rutas, el: '#pgMapa'});
});

	
		
		
	