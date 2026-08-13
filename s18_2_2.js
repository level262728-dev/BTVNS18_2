// 1. Khởi tạo dữ liệu danh sách khóa học
let courses = [
  { name: 'HTML', complete: false },
  { name: 'CSS', complete: false },
  { name: 'Basic of javascript', complete: false },
  { name: 'Node package Manager (npm)', complete: false },
  { name: 'Git', complete: false }
];

// Hàm bổ trợ: In danh sách khóa học chuẩn theo định dạng yêu cầu
function printCourses(list) {
  console.log("========= DANH SÁCH KHÓA HỌC =========");
  list.forEach((course, index) => {
    console.log(`${index + 1}. ${course.name}`);
    console.log(`   Complete: ${course.complete}`);
  });
  console.log("======================================");
}

// 2. Vòng lặp vĩnh cửu thực hiện chức năng CRUD
let isRunning = true;

while (isRunning) {
  let choice = prompt("Mời bạn nhập một trong các ký tự (C / R / U / D / E):");
  
  if (!choice) continue; // Tránh lỗi nếu người dùng nhấn Cancel
  
  choice = choice.trim().toUpperCase();

  switch (choice) {
    case 'C': {
      // Create: Thêm khóa học mới
      let name = prompt("Nhập tên khóa học mới:");
      let completeInput = prompt("Trạng thái hoàn thành? (gõ 'true' nếu xong, 'false' nếu chưa):");
      let complete = completeInput ? completeInput.trim().toLowerCase() === 'true' : false;

      courses.push({ name: name, complete: complete });
      printCourses(courses);
      break;
    }

    case 'R': {
      // Read: In danh sách
      printCourses(courses);
      break;
    }

    case 'U': {
      // Update: Cập nhật khóa học
      let position = Number(prompt("Nhập vị trí (STT) khóa học muốn cập nhật:"));
      let index = position - 1; // Chuyển từ STT hiển thị sang chỉ số mảng (index)

      if (!isNaN(index) && index >= 0 && index < courses.length) {
        let updateName = prompt("Nhập tên khóa học mới:", courses[index].name);
        let updateCompleteInput = prompt(
          "Trạng thái hoàn thành mới? (true/false):", 
          courses[index].complete
        );
        let updateComplete = String(updateCompleteInput).trim().toLowerCase() === 'true';

        courses[index] = {
          name: updateName,
          complete: updateComplete
        };

        printCourses(courses);
      } else {
        alert("Vị trí không tồn tại!");
      }
      break;
    }

    case 'D': {
      // Delete: Xóa khóa học
      let position = Number(prompt("Nhập vị trí (STT) khóa học muốn xóa:"));
      let index = position - 1;

      if (!isNaN(index) && index >= 0 && index < courses.length) {
        courses.splice(index, 1);
        printCourses(courses);
      } else {
        alert("Vị trí không tồn tại!");
      }
      break;
    }

    case 'E': {
      // Exit: Thốat chương trình
      alert("Cảm ơn bạn đã đến với Rikkei Academy");
      isRunning = false;
      break;
    }

    default: {
      alert("Lựa chọn không hợp lệ, vui lòng chỉ nhập C, R, U, D hoặc E!");
      break;
    }
  }
}