import axios from "axios";
import { useState } from "react";

export default function Study03(){
  const [data, setData] = useState({});

  const dataChange = (e) => {

    const {name, value} = e.target;

    setData({
      ...data,
      [name] : value
    });

    console.log(data);

  }

  const dataSubmit = () => {

    axios.post('/api/study03', data).then((res) => {alert(res.data);}).catch((err) => {console.log(err);});

  }

  return (
    <>
      <div>
        <label>타입 : </label>
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
      <button type="button" onClick={dataSubmit}>등 록</button>
    </>
  );
}