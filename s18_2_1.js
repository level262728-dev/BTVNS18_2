// Khởi tạo mảng ban đầu
let products = [
  { id: 1, name: 'Milk', count: 100 },
  { id: 2, name: 'Orange', count: 100 },
  { id: 3, name: 'Butter', count: 100 },
];

// 1. Thêm đối tượng mới có các thuộc tính tương tự
products.push({ id: 4, name: 'Apple', count: 50 });
console.log("--- Mảng sau khi thêm sản phẩm mới ---", products);

// 2. Xóa đối tượng có id là 2
let deleteIndex = products.findIndex(item => item.id === 2);
if (deleteIndex !== -1) {
  products.splice(deleteIndex, 1);
}
console.log("--- Mảng sau khi xóa sản phẩm id = 2 ---", products);

// 3. Truy vấn đến đối tượng có id là 3, sau đó cập nhật count = 0
let targetProduct = products.find(item => item.id === 3);
if (targetProduct) {
  targetProduct.count = 0;
}
console.log("--- Mảng sau khi cập nhật count của id = 3 ---", products);

// 4. Kiểm tra từ khóa "Butter"
let keyword = "Butter";
let foundProduct = products.find(
  item => item.name.toLowerCase() === keyword.toLowerCase()
);

if (foundProduct) {
  console.log("--- Tìm thấy sản phẩm ---", foundProduct);
} else {
  console.log("Không có dữ liệu bạn tìm kiếm");
}