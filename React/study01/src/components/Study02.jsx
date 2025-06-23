import axios from "axios";
import { useState } from "react";

export default function Study02() {

  const [productData, setProductData] = useState();

  const dataChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]:value });
  };

  const registerBtn = () => {
    if (!productData.type || !productData.name || !productData.price) {
      alert("모든 필드를 입력해주세요.");
      return;
    } else {
      axios.post('/api/study02', productData)
        .then(res => {
          alert('등록되었습니다.');
          setProductData({});
        })
        .catch(err => {
          alert('등록에 실패했습니다.');
        })
    }
  }

  return (
    <>
      <div>
        <div>
          <span>종류</span>
          <input type="text" name="type" onChange={dataChange}/>
        </div>
        <div>
          <span>상품명</span>
          <input type="text" name="name" onChange={dataChange}/>
        </div>
        <div>
          <span>가격</span>
          <input type="text" name="price" onChange={dataChange}/>
        </div>

        <button type="button" onClick={registerBtn}>등록</button>
      </div>
    </>
  );
}
