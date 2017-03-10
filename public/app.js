$(() => {
  $.getJSON("/todos", todos => {
    $.each(todos, (id,description) => {
      renderTodo(id,description);
    });
  });
});

function renderTodo(id,description) {
  let todo = $($("#todotemplate").html());
  todo.attr("id", id);
  todo.find(".description").val(description);
  $("#todos").prepend(todo);
}
