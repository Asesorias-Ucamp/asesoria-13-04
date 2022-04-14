// const cowsay = require('cowsay');

// console.log(cowsay.say({
//   text : "algo mas"
// }));

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// rl.question('What is your name?', (name) => {
//   console.log(`Hola ${name}!`);

//   rl.close();
// });

let taskList = []

const addTask = (taskList, taskDescription) => {
    taskList.push({done: false, description: taskDescription})
}

const printTaskList = (taskList) => {
  for(let i = 0; i < taskList.length; ++i){
      if(taskList[i].done){
          //tarea realizada
          console.log(i+1,' [x]', taskList[i].description)
      } else {
          //tarea no realizada
          console.log(i+1, ' [ ]', taskList[i].description)
      }
  }
}

const mode1 = (taskList) => {
  rl.question('Introduce una nueva tarea (Escribe fin si ya NO quieres agregar mas tareas y exit si quieres SALIR del programa) \n', (taskDesc) => {
      switch(taskDesc){
          case 'fin':
              console.log('No se introdujeron mas tareas');
              mode2(taskList)
              break
          case 'exit':
              rl.close()
              break
          default:
              addTask(taskList, taskDesc)
              console.log('La lista de tareas actual es:');
              printTaskList(taskList)
              mode1(taskList)
      }
  })
}

mode1(taskList)
//Marcar las tareas realizadas
const markTaskAsDone = (taskList, index) => {
    if(index >= 0 && index < taskList.length){
        taskList[index].done = true
    } else {
        console.log('Ivalid task number');
    }
}

const checkAllDone = (taskList) => {
  for(let task of taskList){
      if(!task.done)return false
  }
  return true
}

const mode2 = (taskList) => {
  printTaskList(taskList)
  rl.question('Que tareas has realizado? (1 - N) \n', (taskNumber) => {
      switch(taskNumber){
          case 'fin':
          case 'exit':
              console.log('Bye bye')
              rl.close()
              break
          default:
              markTaskAsDone(taskList, taskNumber - 1)
              if(checkAllDone(taskList)){
                  console.log('Has completado tus tareas yay!')
                  rl.close()
              } else {
              mode2(taskList)
          }
      }
  })
}