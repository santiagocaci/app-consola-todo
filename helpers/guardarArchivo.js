const fs = require('fs');

const file = './db/data.JSON';
const guardarDB = (data) => {

  // JSON.stringify transforma un objeto a un string JSON
  fs.writeFileSync(file, JSON.stringify(data));
}

// Lee la base de datos y retorna un JSON con las tareas
const leerDB = () =>{
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, {encoding: 'utf-8'});

  const data = JSON.parse(info);
  // console.log(data);

  return data;
}

module.exports = {
  guardarDB,
  leerDB,
}