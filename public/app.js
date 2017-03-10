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
  $("#todos").prepend(todo);
  todo.find(".description").focus();
}

function formatExisting(todo, id, description) {
  todo.attr("id", id);
  todo.find(".description").val(description);
  todo.find(".description").attr("placeholder", "Update todo");
}

function formatBlank(todo) {
  todo.find(".done").hide();
}
