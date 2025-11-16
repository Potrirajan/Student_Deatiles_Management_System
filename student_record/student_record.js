let students = [];

// Add students
function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const course = document.getElementById("course").value;
  const error = document.getElementById("error");
  const newStudent = { id: Date.now(), name, age, gender, course };
  students.push(newStudent);
  saveData();
  LoadData();
  formReset();
}
// Form Reset
function formReset() {
  const frm = document.getElementById("frm");
  frm.reset();
}
// Save Data From LocalStorage
function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Get Data From LocalStorage
function getData() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Delete Data From LocalStorage
function deleteData(id) {
  if (confirm("Are You Sure Delete ?")) {
    students = students.filter((student) => student.id != id);
    saveData();
    LoadData();
  }
}

// Show Model & Load Previous Data
const model = document.getElementById("model");
const close = document.querySelector(".close");
function editData(id) {
  model.style.display = "flex";
  const data = students.find((student) => student.id == id);
  document.getElementById("mname").value = data.name;
  document.getElementById("mage").value = data.age;
  document.getElementById(
    data.gender == "male" ? "mmale" : "mfemale"
  ).checked = true;
  document.getElementById("mcourse").value = data.course;
  document.getElementById("mid").value = data.id;
}
// Close Model
function closeModel() {
  model.style.display = "none";
}

// Update Data
function updateData() {
  const id = document.getElementById("mid").value;
  const name = document.getElementById("mname").value;
  const age = document.getElementById("mage").value;
  const gender = document.querySelector('input[name="mgender"]:checked')?.value;
  const course = document.getElementById("mcourse").value;
  const updateStudent = { id, name, age, gender, course };
  students = students.map((student) =>
    student.id == id ? updateStudent : student
  );
  LoadData();
  saveData();
  formReset();
  closeModel();
}

// LoadData in Table
function LoadData() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    tbody.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>
    <td>${student.gender}</td>
    <td>${student.course}</td>
    <td><button onclick="editData(${student.id})">Edit</button></td>
    <td><button onclick="deleteData(${student.id})">Delete</button></td>
    </tr>
    `;
  });
}

// Filter Table
function filterTable(){
  const searchText = document.getElementById("textSearch").value.trim().toLowerCase();
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  students.filter((student)=>student.name.toLowerCase().includes(searchText) || student.course.toLowerCase().includes(searchText) || student.gender.toLowerCase().includes(searchText) || student.age.includes(searchText)).forEach((student, index) => {
    tbody.innerHTML += `
    <tr>
    <td>${index + 1}</td>
    <td>${student.name}</td>
    <td>${student.age}</td>
    <td>${student.gender}</td>
    <td>${student.course}</td>
    <td><button onclick="editData(${student.id})">Edit</button></td>
    <td><button onclick="deleteData(${student.id})">Delete</button></td>
    </tr>
    `;
    });
}

// Functions call
students = getData();
LoadData();
