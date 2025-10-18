// 요구 사항 
// - 텍스트 입력후 ‘추가’ 버튼 누르면 아래 목록에 할 일 추가.
// - 새로고침 및 브라우저를 껐다 켜도 투두리스트 유지(localStorage 사용)

const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

// 로컬에서 할 일 불러오기
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;
    todoList.appendChild(li);
  });
}

// 할 일 추가
function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const li = document.createElement("li");
    li.textContent = todoText;
    todoList.appendChild(li);
    todoInput.value = "";
    saveTodos();
  }
}

// 할 일 저장
function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach((li) => {
    todos.push(li.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 이벤트 리스너 설정
addButton.addEventListener("click", addTodo);

// 초기화 시 할 일 불러오기
loadTodos();

