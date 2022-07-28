var input = document.querySelector('input');
var btn = document.querySelector('button');
var list = document.querySelector('ul');

var todo_list = [] 
async function get_all_todos() {
  fetch("http://localhost:8080/todos")
  .then((response) => response.json())
  .then((data) => update_and_display_list(data))
  }

get_all_todos();

async function update_and_display_list(todo_list) {
  var new_children = todo_list.map((todo)  => {
    var ul = document.createElement('ul')
    var checkbox = document.createElement('input');
    var label = document.createElement('label');
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      var todo_checkbox = todo_list.find(t => t.id = checkbox.id);
      var todo_checkbox_id = todo_list.findIndex(t => t.id = checkbox.id);
      check_todo(todo_checkbox).then((data) => {
        todo_list[todo_checkbox_id] = data;
        get_all_todos();
      })
    })
    label.for = checkbox.id;
    label.innerHTML = todo.description;
    
    ul.appendChild(checkbox);
    ul.appendChild(label);
    return ul
  });
  list.replaceChildren(...new_children);
}

async function check_todo(todo) {
  const response = await fetch(`http://localhost:8080/todo/${todo.id}`, {
    method: 'PUT', 
    mode: 'cors', 
    cache: 'no-cache',
  })
  return response.json();
}

async function add_element(todo) {
  const response = await fetch("http://localhost:8080/todo", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)      
    });
  return response.json();
}

btn.addEventListener('click', () => {
  var todo = {
    id: 0,
    description: input.value,
    done: false,
  }
  
  input.value = null
  
  add_element(todo).then(
    (data) => {
      console.log(data);
      get_all_todos();
    }
  )
  
  
})
