
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

function buscar() {
    fetch(`/api/series/${document.getElementById("buscar").value}`)
      .then((res) => res.json())
      .then(function (datos) {
        if (datos.error) {
          feedback("Ha habido un error");
        } else {
          imprimir(datos);
        }
      });
  }

  function formulario() {
    let titulo = document.getElementById('titulo').value;
    let plataforma = document.getElementById('plataforma').value;
    let nota = document.getElementById('nota').value;
    let paquete = [
        titulo,
        plataforma,
        nota       
    ];
   fetch('/api/nuevaSerie', {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body:JSON.stringify(paquete)//solo lee json
})

.then((res) => res.json())
.then(function(datos){
    datos.error
    ? document.getElementById("feedback").innerHTML =`<p>Error durante guardado</p>`

    : document.getElementById("feedback").innerHTML =`<p>Elemento correctamente guardado</p>`
    mostrarLista();
})
}

  function imprimir(datos) {
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].plataforma}</td><td>${datos.contenido[i].nota}</td></tr>`;
    }
    document.getElementById("series").innerHTML = `<table><th>Título:</th><th>Estado:</th>${parrafo}</table>`;
  }