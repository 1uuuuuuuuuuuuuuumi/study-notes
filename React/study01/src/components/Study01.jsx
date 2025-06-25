import axios from "axios";
import { useState } from "react";

export default function Study02() {
  const [data, setData] = useState({});

  const dataChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const dataSubmit = () => {
    axios.post('/api/study02', data).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div>
        <div>
          <label>종류 : </label>
          <input type="text" name="productType" onChange={dataChange}/>
        </div>
        <div>
          <label>이름 : </label>
          <input type="text" name="productName" onChange={dataChange}/>
        </div>
        <div>
          <label>가격 : </label>
          <input type="text" name="price" onChange={dataChange}/>
        </div>
        <button type="button" onClick={(e) => {dataSubmit()}}>등록</button>
      </div>
    </>
  );
}