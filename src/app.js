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
var id = 0;

async function update_and_display_list(todo_list) {
  var new_children = todo_list.map((todo)  => {
    var ul = document.createElement('ul')
    var checkbox = document.createElement('input');
    var label = document.createElement('label');
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    
    label.for = checkbox.id;
    label.innerHTML = todo.description;
    
    ul.appendChild(checkbox);
    ul.appendChild(label);
    return ul
  });
  list.replaceChildren(...new_children);
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
    id: id,
    description: input.value,
  }
  
  input.value = null
  
  add_element(todo).then(
    (data) => {
      console.log(data);
      get_all_todos();
    }
  )
  
  
})
