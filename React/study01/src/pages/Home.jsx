import axios from "axios";
import { useState } from "react";
import Study02 from "../components/Study02";

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
      <Study02 />
    </>
  );
}