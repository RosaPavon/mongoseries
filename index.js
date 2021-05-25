const express =require("express")
const mongodb=require("mongodb")
const MongoClient = mongodb.MongoClient
const app=express()
let db
app.use (express.static("public"))//para la carpeta public
app.use (express.urlencoded({extended:false}))//recibe un objeto
app.use(express.json)
MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error, client) {
      error 
      ? console.log(error) 
      : (db = client.db("series"));
    }
  );

  app.get("/api/series", function (req, res) {
    db.collection("series").find().toArray(function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos })
      });
  });

  app.get("/api/series/:titulo", function (req, res) {
    db.collection("series")
      .find({ titulo: {$regex:' ${req.query.titulo}'}})//se usa el query porque viene de un formulario
      .toArray(function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos })
      })
  })

  app.post("/api/nuevaSerie", function (req, res) {
    db.collection("series").insertOne(
      { titulo: req.body.titulo,plataforma: req.body.titulo,nota: req.body.nota},
      function (error, datos) {
        error
          ? res.send({ error: true, contenido: error })
          : res.send({ error: false, contenido: datos });
      }
    );
  });

  app.post("/api/nuevaSerie", function (req, res) {

    let titulo = req.body.titulo;  
    let plataforma = req.body.plataforma;  
    let nota = req.body.nota;
  
    let paquete = { titulo:titulo, plataforma:plataforma, nota:nota};// asi es como llamamamos 

    db.collection("series").insertOne(paquete, function(error, respuesta){//grabamoms los datos que hemos recibido
      if(error!==null){//mandamos respuesta por si va bien o mal
        console.log(error)
        res.send({error:true, mensaje: error})
      }else{
        res.send({error:false, mensaje:respuesta})
      }

    })

  })

  app.listen(3000)