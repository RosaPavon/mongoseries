
mostrarLista();//la funcion por la que se llama a la lista

function mostrarLista() {
  fetch("/api/series")
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        imprimir(datos);
      }
    });
}
//Para recibir los datos del formulario, nos llegan query,¿quien la recibe en el fromt?

function buscar() {
    fetch(`/api/series/?titulo=${document.getElementById("titulo").value}`)//recogemos el valor del imput titulo
      .then(res => res.json())
      .then(function (datos) {
        if (datos.error) {
          feedback("Ha habido un error");
        } else {
          imprimir(datos);
        }
      });
  }

  function anyadir() {
    /*let titulo = document.getElementById('titulo2').value;
    let plataforma = document.getElementById('plataforma').value;
    let nota = document.getElementById('nota').value;
    let paquete = [
        titulo,
        plataforma,
        nota       
    ];*/
   fetch('/api/nuevaSerie', {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body:JSON.stringify({
    titulo : document.getElementById('titulo2').value,//esto es el req.body
    plataforma : document.getElementById('plataforma').value,
    nota : parseInt(document.getElementById('nota').value)
})
   }
.then(res => res.json())
.then(function(datos){
    datos.contenido.insertedCount >= 1
    ? document.getElementById("feedback").innerHTML =`<p>Elemento correctamente guardado</p>`

    : document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`
    mostrarLista();
})
   )}

  function imprimir(datos) {
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].plataforma}</td><td>${datos.contenido[i].nota}</td></tr>`;
    }
    document.getElementById("series").innerHTML = `<table><th>Título:</th><th>Plataforma:</th><th>Nota:</th>${parrafo}</table>`;
  }

  function feedback(string) {
    document.getElementById("feedback").innerHTML = `<p>${string}</p>`;
  }