// 1. Mở rộng mảng dữ liệu (đảm bảo mỗi nhóm có đủ 6 cây)
const plantsArray = [
  { category: "Indoor", name: "Snake Plant", image: "...", cost: 20 },
  { category: "Indoor", name: "Spider Plant", image: "...", cost: 15 },
  // ... thêm đủ 6 cây cho nhóm Indoor
  { category: "Outdoor", name: "Lavender", image: "...", cost: 15 },
  // ... thêm đủ 6 cây cho nhóm Outdoor
  { category: "Succulents", name: "Aloe Vera", image: "...", cost: 10 },
  // ... thêm đủ 6 cây cho nhóm Succulents
];

// 2. Thay vì dùng 1 vòng lặp .map() cho tất cả, hãy nhóm chúng lại:
function ProductList() {
  return (
    <div>
      {["Indoor", "Outdoor", "Succulents"].map((category) => (
        <div key={category}>
          <h2>{category}</h2> {/* Đây là tiêu đề nhóm mà hệ thống yêu cầu */}
          <div className="product-list">
            {plantsArray
              .filter(plant => plant.category === category)
              .map(plant => (
                <div key={plant.name} className="product-card">
                  {/* ... render card sản phẩm như cũ ... */}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}