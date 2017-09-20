/**
 * http://usejsdoc.org/
 */
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var app = express();
app.use(bodyParser.json());
app.use(express.static('static'));
var db = new sqlite3.Database('mydb.db');
var rutas = [];
var rutaAux =[];
var nextId = 0;
db.serialize(function() {
	  console.log("_______ BEFORE CREATING A NEW TABLE ______");
	  db.run("CREATE TABLE if not exists user_info (titulo TEXT,visible TEXT,color TEXT,posiciones TEXT, date DATETIME)");	  
	  db.each("SELECT rowid AS id, titulo, visible, color, posiciones, date FROM user_info", function(err, row) {
			   var rutaData =[row.id,row.titulo,row.visible,row.color,JSON.parse(row.posiciones),row.date];
			   nextId = row.id;
			   rutaAux.push(rutaData);  
		   });    	
})

app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', "*");
	  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method == 'OPTIONS') {res.status(200).send();}
	else {next(); }
});

var rutas = [];

app.post('/misrutas/rutas', function(req, res) { 
	console.log('POST1 /misrutas/rutas');
	console.log(req);
	var ruta = req.body;
	ruta.id = nextId++;
	rutas.push(ruta);
    
    //INSERCION EN BASE DE DATOS    
    db.serialize(function() {
    	var stmt = db.prepare("INSERT INTO user_info VALUES (?,?,?,?,?)");
    	stmt.run(ruta.titulo,ruta.visible,ruta.color,JSON.stringify(ruta.posiciones),"4-5-2017");
  	    stmt.finalize(); 
  	    res.send(ruta);
	    db.each("SELECT rowid AS id, titulo, visible, color, posiciones, date FROM user_info", function(err, row) {
		  console.log(row.id + ": "+ row.titulo +" : "+ row.visible +" : "+ row.color + " : "+ row.posiciones +": "+ row.date);
	  }); 	
    })
});

app.get('/misrutas/rutas', function(req, res) { 
	console.log('GET2 /misrutas/rutas');
    db.serialize(function() {
    	//rutas = [];
	   db.each("SELECT rowid AS id, titulo, visible, color, posiciones, date FROM user_info", function(err, row) {
		   var rutaData =[row.id,row.titulo,row.visible,row.color,row.posiciones,row.date];
		   nextId = row.id;
		   console.log("VALOR ROW "+row.id);
		   rutaAux.push(rutaData);  
	   });    	
    })

	var rutaDB = req.body;
	rutas =[];
	for (i= 0; i < rutaAux.length; i++){
		 rutaDB = {};
		 rutaDB.id = rutaAux[i][0];
		 console.log(" Valor de ID "+rutaDB.id);
		 rutaDB.titulo = rutaAux[i][1];
		 rutaDB.visible = rutaAux[i][2];
		 rutaDB.color = rutaAux[i][3];
		 rutaDB.posiciones = rutaAux[i][4];
		 rutas.push(rutaDB);
	}
	res.send(rutas);
});

app.get('/misrutas/rutas/:id', function(req, res) { 
	console.log('GET3 /misrutas/' + req.params.id); 
	for (var i = 0; i < rutas.length; i++) {
		if (rutas[i].id == req.params.id) { 
			res.send(rutas[i]);
			return; }
	}
       res.status(404).send('Not found');
});

app.put('/misrutas/rutas/:id', function(req, res) {
	console.log('PUT4 /misrutas/' + req.params.id); 
	console.log(req.originalUrl);	
	
	for (var i = 0; i < rutas.length; i++) {	
			if (rutas[i].id == req.params.id) { 
				rutas[i] = req.body;				
				db.serialize(function() {
					db.run("UPDATE user_info SET titulo = '"+rutas[i].titulo+"',visible ='"+rutas[i].visible+"',color ='"+rutas[i].color+"', posiciones='"+JSON.stringify(rutas[i].posiciones)+"', date = '"+rutas[i].date+"' WHERE rowid ='"+rutas[i].id+"'");
			  	    db.each("SELECT rowid AS id, titulo, visible, color, posiciones, date FROM user_info WHERE rowid ='"+rutas[i].id+"'", function(err, row) {
					  console.log(row.id + ": "+ row.titulo +" : "+ row.visible +" : "+ row.color + " : "+ row.posiciones +": "+ row.date);
				  });
				})			
				res.send(rutas[i]);
				return; }
	}
	res.status(404).send('Not found');
	});

app.del('/misrutas/rutas/:id', function(req, res) { 
	console.log('DELETE /misrutas/' + req.params.id);
	db.serialize(function() {
		db.run("DELETE FROM user_info WHERE rowid='"+req.params.id+"'");
  	    db.each("SELECT rowid AS id, titulo, visible, color, posiciones, date FROM user_info", function(err, row) {
		  console.log(row.id + ": "+ row.titulo +" : "+ row.visible +" : "+ row.color + " : "+ row.posiciones +": "+ row.date);
	  });   	
	})
		
	for (var i = 0; i < rutas.length; i++) {
		if (rutas[i].id == req.params.id) { 
			rutas.splice(i, 1);
	       res.status(204).send();
	       return; 
		}
	}	
	res.status(404).send('Not found');	
});
var port = process.env.PORT || 8080;
app.listen(port);

	
	
	



