interface ProductCardProps {
  name: string;
  price: number;
  stock: number;
  discount?: number; // 선택적! (? 붙임)
  image?: string;
}

function ProductCard({
  name,
  price,
  stock,
  discount,
  image,
}: ProductCardProps) {
  // 할인가 계산
  const finalPrice = discount
    ? Math.round(price * (1 - discount / 100))
    : price;

  return (
    <div
      style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {image && (
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          {image}
        </div>
      )}

      <h3>{name}</h3>

      <div>
        {discount ? (
          <>
            <p style={{ textDecoration: "line-through", color: "#999" }}>
              ₩{price.toLocaleString()}
            </p>
            <p
              style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "20px" }}
            >
              ₩{finalPrice.toLocaleString()}
              <span style={{ color: "#e74c3c", fontSize: "16px" }}>
                ({discount}% 할인!)
              </span>
            </p>
          </>
        ) : (
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            ₩{price.toLocaleString()}
          </p>
        )}
      </div>

      {/* 재고 표시 */}
      <p style={{ color: stock > 0 ? "green" : "red" }}>
        {stock > 0 ? `재고: ${stock}개` : "품절"}
      </p>
    </div>
  );
}

// App 컴포넌트
function App() {
  return (
    <div 
      style={{
        padding:"20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h1>🛍️ 온라인 쇼핑몰</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        <ProductCard
          name="무선 키보드"
          price={50000}
          stock={10}
          discount={20}
          image="⌨️"
        />

        <ProductCard
          name="게이밍 마우스"
          price={80000}
          stock={5}
          image="🖱️"
        />

        <ProductCard 
          name="모니터"
          price={300000}
          stock={0}
          discount={15}
          image="🖥️"
        />

        <ProductCard 
          name="웹캠"
          price={120000}
          stock={3}
          discount={10}
          image="📷"
        />
      </div>
    </div>
  );
}

export default App;
