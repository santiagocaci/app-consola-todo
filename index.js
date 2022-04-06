require('colors/safe');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoCheckList } = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  // await pausa();


  do {
    // Imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Crear tarea
        const desc = await leerInput('Descripcion:');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;

      case '3':
        tareas.listarPendientesCompletadas();
        break;

      case '4':
        tareas.listarPendientesCompletadas(false);
        break;

      case '5':
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case '6':
        const id = await listadoTareaBorrar(tareas.listadoArr);
        if (id !== '0') {
          const confirmacion = await confirmar('¿Estas seguro de querer realizar esta accion?');
          if (confirmacion) {
            tareas.borrarTarea(id);
            console.log(`¡Tarea borrada!`);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();

  } while (opt !== '0');

}

main();