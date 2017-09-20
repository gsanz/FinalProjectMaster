function obtainAllRoute(){
	$.ajax({
		url: 'http://localhost:8080/misrutas/rutas', method: 'GET',
		dataType: 'json',
		success: function(data, text, xhr) {
		$('#info').html('Success: ' + text + '<br>'); for (var i = 0; i < data.length; i++)
		      $('#info').append('<p>' + JSON.stringify(data[i]) + '</p>');
		  },
		error: function(xhr, text, error) { $('#info').html('Error ' + text + '<br>' + error);} 
		  });	
}

function searchRoute(){
	$.ajax({
		url: 'http://localhost:8080/misrutas/rutas/' + $('#txtId').val(), method: 'GET',
		dataType: 'json',
		success: function(data, text, xhr) {
		    $('#info').html('Success: ' + text + '<br>');
		    $('#info').append('<p>' + JSON.stringify(data) + '</p>');
		  },
		error: function(xhr, text, error) { $('#info').html('Error ' + text + '<br>' + error);} 
		  });
}

function createRoute(){
	$.ajax({
		  url: 'http://localhost:8080/misrutas/rutas',
		  method: 'POST',
		  dataType: 'json',
		  data: JSON.stringify({titulo: $('#txtTitulo').val()}),
		  processData: false,
		  contentType: 'application/json; charset=utf-8',
		  success: function(data, text, xhr) {
		    $('#info').html('Success: ' + text + '<br>');
		    $('#info').append('<p>' + JSON.stringify(data) + '</p>');
		  },
		  error: function(xhr, text, error) {
		    $('#info').html('Error ' + text + '<br>' + error);
		} 
		});

}

function updateRoute(){
	$.ajax({
		  url: 'http://localhost:8080/misrutas/rutas/' + $('#txtId').val(),
		  method: 'PUT',
		  dataType: 'json',
		  data: JSON.stringify({id: $('#txtId').val(), titulo: $('#txtTitulo').val()}),
		  processData: false,
		  contentType: 'application/json; charset=utf-8',
		  success: function(data, text, xhr) {
		    $('#info').html('Success: ' + text + '<br>');
		    $('#info').append('<p>' + JSON.stringify(data) + '</p>');
		  },
		  error: function(xhr, text, error) {
		    $('#info').html('Error ' + text + '<br>' + error);
		} 
	 });
}

function deleteRoute(){
	$.ajax({
		url: 'http://localhost:8080/misrutas/rutas/' + $('#txtId').val(), method: 'DELETE',
		success: function(data, text, xhr) {
		    $('#info').html('Success: ' + text + '<br>');
		  },
		error: function(xhr, text, error) { $('#info').html('Error ' + text + '<br>' + error);
		} 
	});
}
