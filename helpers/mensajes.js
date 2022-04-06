const colors = require('colors/safe');

const showMenu = () => {

  return new Promise((resolve, reject) => {
    console.clear();
    console.log(colors.green('====================='));
    console.log('Seleccione una opcion');
    console.log(colors.green('====================='));

    console.log(`${colors.green('1.')} Crear tarea`);
    console.log(`${colors.green('2.')} Listar tareas`);
    console.log(`${colors.green('3.')} Listar tareas completadas`);
    console.log(`${colors.green('4.')} Listar tarea pendientes`);
    console.log(`${colors.green('5.')} Completar tarea(s)`);
    console.log(`${colors.green('6.')} Borrar tarea`);
    console.log(`${colors.green('0.')} Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Recibe informacion 
    readline.question('Seleccione una opcion: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });

}

const pausa = () => {

  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Recibe informacion 
    readline.question(`\nPresione ${colors.green('ENTER')} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });

}

module.exports = {
  showMenu,
  pausa,
};