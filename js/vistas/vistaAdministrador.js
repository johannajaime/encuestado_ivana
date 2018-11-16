/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function(modelo, preguntaID) {
    contexto.reconstruirLista(preguntaID);
  });
  this.modelo.preguntaEditada.suscribir(function(){
    contexto.reconstruirLista();
    mostrarPopup    
  });

  this.modelo.preguntasEliminadas.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
 // this.controlador.loadPregutas();
  validacionDeFormulario();
  this.reconstruirLista();
  this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem=$('<li class="list-group-item" id="' + pregunta.id + '">'+ pregunta.textoPregunta +'</li>');
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function() {
      /*
      contexto.controlador.agregarPregunta();
      contexto.limpiarFormulario();
      */
      var respuestas = [];

      $('[name="option[]"]').each(function () {
        var respuesta = $(this).val();
        //Completar el agregado de una respuesta
        // pusheandola al arreglo de respuestas
        respuestas.push({ 'textoRespuesta': respuesta, 'cantidad': 0 });

      })

      var value = $('#pregunta').val();
      contexto.controlador.agregarPregunta(value,respuestas);
      contexto.limpiarFormulario();
      
    });
     e.botonEditarPregunta.click(function(){
      contexto.controlador.editarPregunta();
    });
    // Completar la asociación de de eventos a los
    // botones editarPregunta, borrarPregunta y borrarTodo
    
    e.botonBorrarPregunta.click(function() {
      contexto.controlador.borrarPregunta();
    });

    e.borrarTodo.click(function(){
      contexto.controlador.borrarTodo();
    });
  },


  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
   mostrarPopup: function(){
    var resp = prompt("Editar Pregunta: ");
  },
};
