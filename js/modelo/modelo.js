/*
 * Modelo
 */
const storage = window.localStorage;
var Modelo = function() {
  
  if (!storage.getItem('preguntas')) {
    storage.setItem('preguntas', '[]');
  }
  this.preguntas = JSON.parse(storage.getItem('preguntas'));
  this.ultimoId = this.obtenerUltimoId();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length > 0){
      var ultimaPregunta = this.preguntas[this.preguntas.length - 1];
      return ultimaPregunta.id;
    }else{
      return 0;
    }
    this.preguntaEliminada.notificar();
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta : function(id){
    for(var i=0;i<this.preguntas.length;i++){
      var pregunta = this.preguntas[i];
      if(pregunta.id==id){
        this.preguntas.splice(i, 1);
        break;
      }
    }
    this.preguntaEliminada.notificar(id);
    this.guardar();
  },
  borrarTodo : function(){
    this.preguntas= [];
    this.guardar();
    this.preguntasEliminadas.notificar();
  },
  //se guardan las preguntas
  guardar: function(){
    
    storage.setItem("preguntas", JSON.stringify(this.preguntas));

  },
  editarPregunta: function(id, nombre, respuestas ){
    var preguntas = id;
    this.preguntas = JSON.parse(storage.getItem('preguntas'));
    var preg =this.preguntas.find(function(elem){
        return elem.id == id
    })
    var editarPreg = {'textoPregunta': preg.nombre, 'id': id, 'cantidadPorRespuesta': preg.respuestas};
    this.preguntas.push(editarPreg);
    this.guardar();
    this.preguntaEditada.notificar();
  },
  cargarPreguntas: function(){
    var listaPregunta = storage.getItem("pregunta");
    if (listaPregunta){
      this.pregunta = JSON.parse(listaPregunta);
    }
  },
   obtenerPregunta: function (nombrePregunta) {
    for (let i = 0; i < this.preguntas.length; i++) {
      const pregunta = this.preguntas[i];
      if(pregunta.textoPregunta === nombrePregunta) {
        return pregunta;
      }
    }
  },
 sumarVoto: function(idPregunta, idResp){
    for (var i = 0; i < this.preguntas.length; i++){
      var pregunta = this.preguntas[i];
      if (pregunta.id == id){
        this.preguntas[i].cantidadPorRespuesta[idResp].cantidad ++;
        break;
      }
    }
    this.guardar();
  }
};

