// Dữ liệu mẫu ban đầu
const defaultCourses = [
  {
    id: 1,
    content: 'Learn Javascript Session 01',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Anh Bách',
  },
  {
    id: 2,
    content: 'Learn Javascript Session 2',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Lâm',
  },
  {
    id: 3,
    content: 'Learn CSS Session 1',
    dueDate: '2023-04-17',
    status: 'Pending',
    assignedTo: 'Hiếu Ci ớt ớt',
  },
];

// Khởi tạo mảng tasks: Lấy từ LocalStorage nếu có, nếu chưa thì lấy defaultCourses
let tasks = JSON.parse(localStorage.getItem('tasks'));
if (!tasks || tasks.length === 0) {
  tasks = defaultCourses;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Biến lưu trạng thái sửa (null: đang thêm mới | id: đang sửa công việc có id này)
let editTaskId = null;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const contentInput = document.getElementById('content');
const dueDateInput = document.getElementById('dueDate');
const statusSelect = document.getElementById('status');
const assignedToInput = document.getElementById('assignedTo');
const submitBtn = document.getElementById('submitBtn');
const taskList = document.getElementById('taskList');

// Hàm lưu dữ liệu vào LocalStorage và Render lại giao diện (Read)
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.content}</td>
      <td>${task.dueDate}</td>
      <td>${task.status}</td>
      <td>${task.assignedTo}</td>
      <td>
        <button class="btn-action btn-edit" onclick="editTask(${task.id})">Sửa</button>
        <button class="btn-action btn-delete" onclick="deleteTask(${task.id})">Xóa</button>
      </td>
    `;
    taskList.appendChild(tr);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Xử lý Thêm mới (Create) hoặc Cập nhật (Update)
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const content = contentInput.value.trim();
  const dueDate = dueDateInput.value;
  const status = statusSelect.value;
  const assignedTo = assignedToInput.value.trim();

  if (editTaskId === null) {
    // --- TÍNH NĂNG CREATE ---
    const newTask = {
      id: Date.now(), // Tạo ID duy nhất bằng timestamp
      content,
      dueDate,
      status,
      assignedTo,
    };
    tasks.push(newTask);
  } else {
    // --- TÍNH NĂNG UPDATE ---
    const taskIndex = tasks.findIndex((t) => t.id === editTaskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        id: editTaskId,
        content,
        dueDate,
        status,
        assignedTo,
      };
    }
    // Reset lại trạng thái form về thêm mới
    editTaskId = null;
    submitBtn.textContent = 'Submit';
  }

  saveToLocalStorage();
  renderTasks();
  taskForm.reset();
});

// Xử lý Đưa dữ liệu lên form để Sửa (Update - Step 1)
function editTask(id) {
  const taskToEdit = tasks.find((t) => t.id === id);
  if (taskToEdit) {
    contentInput.value = taskToEdit.content;
    dueDateInput.value = taskToEdit.dueDate;
    statusSelect.value = taskToEdit.status;
    assignedToInput.value = taskToEdit.assignedTo;

    editTaskId = id;
    submitBtn.textContent = 'Update';
  }
}

// Xử lý Xóa công việc (Delete)
function deleteTask(id) {
  if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
    tasks = tasks.filter((t) => t.id !== id);
    saveToLocalStorage();
    renderTasks();

    // Nếu đang sửa đúng bài vừa xóa thì reset form
    if (editTaskId === id) {
      editTaskId = null;
      submitBtn.textContent = 'Submit';
      taskForm.reset();
    }
  }
}

// Hiển thị dữ liệu khi tải trang lần đầu
renderTasks();