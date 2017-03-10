$(() => {
  $.getJSON("/todos", todos => {
    $.each(todos, (id,description) => {
      renderTodo(id,description);
    });
    renderTodo();
  });
});

function renderTodo(id,description) {
  let todo = $($("#todotemplate").html());
  id ? formatExisting(todo, id, description) : formatBlank(todo);
  setLinks(todo);
  $("#todos").prepend(todo);
  todo.find(".description").focus();
}

function setLinks(todo) {
  todo.find(".save").click(() => saveTodo(todo));
  todo.find(".description").keypress(e => {
    if(e.which === 13) saveTodo(todo);
  });
  todo.find(".done").click(() => deleteTodo(todo));
}

function formatExisting(todo, id, description) {
  todo.attr("id", id);
  todo.find(".description").val(description);
  todo.find(".description").attr("placeholder", "Update todo");
}

function formatBlank(todo) {
  todo.find(".done").hide();
}

function formatNew(todo, id) {
  todo.attr("id", id);
  todo.find(".done").show();
}

function saveTodo(todo) {
  todo.attr("id") ? updateTodo(todo) : createTodo(todo);
}

function createTodo(todo) {
  let description = todo.find(".description").val();
  $.post("/todos/create", { description: description }, data => {
    formatNew(todo, data.id);
    flashSuccess(todo);
    renderTodo();
  });
}

function updateTodo(todo) {
  console.log("update me!");
}

function deleteTodo(todo) {
  console.log("delete me!");
}

function flashSuccess(todo) {
  let saveTag = todo.find(".save");
  saveTag.html("success!");
  setTimeout(() => saveTag.html("save"), 1000);
}
