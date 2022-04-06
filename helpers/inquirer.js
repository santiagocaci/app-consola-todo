const colors = require('colors');
const inquirer = require('inquirer');

const question = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
      {
        value: '1',
        name: `${colors.green('1.')} Crear tarea`,
      },
      {
        value: '2',
        name: `${colors.green('2.')} Listar tareas`,
      },
      {
        value: '3',
        name: `${colors.green('3.')} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${colors.green('4.')} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${colors.green('5.')} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${colors.green('6.')} Borrar tarea`,
      },
      {
        value: '0',
        name: `${colors.green('0.')} Salir`,
      },
    ],
  }
];

const inquirerMenu = async () => {

  console.clear();
  // console.log('\033[2J');
  console.log(colors.green('====================='));
  console.log('Seleccione una opcion');
  console.log(colors.green('=====================\n'));

  const { opcion } = await inquirer.prompt(question);
  return opcion;
}

const pausa = async () => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${colors.green('ENTER')} para continuar`,
    }
  ];
  console.log('\n');
  await inquirer.prompt(question);
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value = '') {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listadoTareaBorrar = async (tareas = []) => {

  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${colors.blue(i + 1 + '.')} ${tarea.desc}`,
    }
  })

  choices.unshift({
    value: '0',
    name: `${colors.blue('0.')} Cancelar`,
  }
  );

  const preg = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    }
  ]

  const { id } = await inquirer.prompt(preg);
  return id;
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    }
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${colors.blue(i + 1 + '.')} ${tarea.desc}`,
      checked: (tarea.completed) ? true : false,
    }
  })

  const preg = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    }
  ]

  const { ids } = await inquirer.prompt(preg);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirmar,
  mostrarListadoCheckList,

}