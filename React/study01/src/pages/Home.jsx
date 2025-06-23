import axios from "axios";
import { useState } from "react";

export default function Home(){

  const [data, setData] = useState();

  const handleChange = e => {
    const { name, value } = e.target;
    setData({...data, [name]: value });
  }

  const handleSubmit = () => {
    axios.post('/api/study01', data)
      .then(res => {
        alert('등록되었습니다.');
        setData({});
      })
      .catch(err => {
        alert('등록에 실패했습니다.');
      })
  }
  
  return (
    <>
      <div>
        <div>
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email : </label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="message">Message : </label>
          <input type="message" name="message" onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSubmit}>등록하기</button>
      </div>
    </>
  );
}