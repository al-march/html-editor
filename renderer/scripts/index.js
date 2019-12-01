const { ipcRenderer } = require('electron')

const btn = document.querySelector('#addPath')
const input = document.querySelector('#path')

btn.addEventListener('click', () => {
  console.log(input.value);
  ipcRenderer.send('add-path', input.value)
})

ipcRenderer.on('html-content', (event, html) => {
  const strings = document.querySelector('#strings');
  const stringsItems = html.reduce((acc, string) => {
    acc +=
      `
    <div class="input-field">
      <i class="material-icons prefix">mode_edit</i>
      <textarea href="#!" class="materialize-textarea outputStr">${string}</textarea>
    </div>
    `
    return acc
  }, '')
  strings.innerHTML = stringsItems

  let outputStr = document.querySelectorAll('.outputStr')
  rewriteString(outputStr)
})
function rewriteString(arr) {
  arr.forEach((item, i) => {
    M.textareaAutoResize(item)
  });
}

const completeBtn = document.querySelector('#complete')
completeBtn.addEventListener('click', () => {
  let rewriteContent = []
  let inputs = document.querySelectorAll('.outputStr')  
  inputs.forEach(item => {
    rewriteContent.push(item.value)
    
  })
  
  
  ipcRenderer.send('rewrite-complete', rewriteContent)
})




// // удаление туду листа
// const deleteTodo = e => {
//   ipcRenderer.send('delete-todo', e.target.textContent)
// }

// // открытие окна добавления туду
// document.querySelector('#create-todo').addEventListener('click', () => {
//   ipcRenderer.send('add-todo-window')
// })



// // генерация туду
// ipcRenderer.on('todos', (event, todos) => {
//   // получение тудутега
//   const todoList = document.querySelector('#todo-list')
//   console.log(todos);
//   // генерация разметки
//   const todoItems = todos.reduce((html, todo) => {


//     html +=
//       `
//     <li> 
//       <div class="collapsible-header">
//         <i class="material-icons">place</i>
//         ${todo.name} 
//         <span class="badge">1</span>
//       </div>
//       <div class="collapsible-body"><p>${todo.desc}</p></div>
//     </li>
//     `
//     return html
//   }, '')

//   todoList.innerHTML = todoItems

//   todoList.querySelectorAll('.collection-item').forEach(item => {
//     item.addEventListener('click', deleteTodo)
//   })
// })

M.AutoInit()


setInterval(() => {
  M.updateTextFields();
}, 222);