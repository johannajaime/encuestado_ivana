/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    if (value != ""){
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
        if (respuesta !=""){
          respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0}); 
        }
      })
    }
    this.modelo.agregarPregunta(value, respuestas);
  },
  borrarPregunta: function(){
    var id = parseInt($('.list-group-item.active').attr('id'));
    this.modelo.borrarPregunta(id);
  },
  borrarTodo: function(){
    this.modelo.borrarTodo();
  },
  editarPregunta: function(){
    var id = parseInt($('.list-group-item.active').attr('id'));
    var nombre = ($('.list-group-item.active').attr('nombre'));
    var respuestas = ($('.list-group-item.active').attr('respuestas'));
    this.modelo.editarPregunta(id, nombre, respuestas);
  },
  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value')
      var id = $(this).attr('id')
      var pregunta = contexto.modelo.obtenerPregunta(nombrePregunta);
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      contexto.agregarVoto(pregunta,respuestaSeleccionada);
    });
  },
  loadPreguntas: function(){
    this.modelo.cargaPreguntas();
  },
  
};
