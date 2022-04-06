const colors = require('colors/safe');
const Tarea = require('./tarea.js');

class Tareas {

  _listado = {};

  constructor() {
    this._listado = {};
  }

  // retorna un array con las tareas de _listado
  get listadoArr() {
    const list = [];
    // Object.keys() Retorna un arreglo de las keys de un objeto
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      list.push(tarea);
    });
    return list;
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  // Crea las tareas a partir del array que entra por parametro
  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  // Imprime por pantalla un listado de las desc tareas y su estado en orden ascendente 
  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((elto, i) => {
      console.log(
        `${colors.green((i + 1) + '.')} ${colors.bold(elto.desc)} :: ${(elto.completed)
          ? `${colors.green('Completada')}`
          : `${colors.red('Pendiente')}`}`);
    });
  }

  // Lista las tareas completadas por defecto. Si entra un false por parametro lista las pendientes
  listarPendientesCompletadas(completadas = true) {

    console.log();
    let indice = 0;

    if (completadas) {

      this.listadoArr.forEach(tarea => {
        if (tarea.completed) {
          console.log(`${colors.green((indice + 1) + '.')} ${colors.bold(tarea.desc)} :: ${colors.green('Completadas')} :: ${colors.magenta(tarea.completed)}`);
          indice++;
        }
      });
    } else {

      this.listadoArr.forEach(tarea => {
        if (!tarea.completed) {
          console.log(`${colors.green((indice + 1) + '.')} ${colors.bold(tarea.desc)} :: ${colors.red('Pendiente')}`);
          indice++;
        }
      });
    }
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    
    ids.forEach( id =>{
      const tarea = this._listado[id];
      if(!tarea.completed){
        tarea.completed = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completed = null;
      }
    })
  }
}


module.exports = Tareas;