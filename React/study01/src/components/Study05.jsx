import axios from "axios";
import { useEffect, useState } from "react";

export default function Study05() {
  const [data, setData] = useState({})

  const [initialData, setInitialData] = useState({});

  const dataChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  console.log(data);

  const dataSubmit = (e) => {
    axios.post('/api/study05', data)
    .then((res) => {alert('저장 성공')})
    .catch((err) => {console.log(err)})
  }

  useEffect(() => {

    axios.get('/api/study05')
      .then((res) => {
        console.log(res.data);
        setInitialData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      
  }, []);

  return (
    <>
    <div>
        <div>
          <label>종류 적으세요 : </label>
          <input type="text" onChange={dataChange}/>
        </div>
        <div>
          <label>이름 적으세요 : </label>
          <input type="text" onChange={dataChange}/>
        </div>
        <div>
          <label>가격 적으세요 : </label>
          <input type="text" onChange={dataChange}/>
        </div>
        <button type="button" onClick={dataSubmit}>등     록</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>종류</th>
            <th>이름</th>
            <th>가격</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{initialData.productType}</td>
            <td>{initialData.productName}</td>
            <td>{initialData.price}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
