import axios from "axios";
import { useState } from "react"

export default function Study04 () {
  const [item, setItem] = useState({});

  const dataChange = (e) => {
    const {name, value} = e.target;
    setItem({
      ...item,
      [name]: value
    });
  }

  const dataSubmit = (e) => {
    axios.post('/api/study04', item).then((res) => {alert(res.data)}).catch((err) => {console.log(err)});
  }

  return (
    <>
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
    <button type="button" onClick={dataSubmit}>등 록</button>
    </>
  )
}