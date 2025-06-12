import axios from 'axios';
import React, { useEffect } from 'react'

const Study = () => {
  useEffect(() => {
    axios.get(
      'http:/localhost:8080/study'
    ).then(
      res => {
        console.log(res.data);
      }
    ).catch(
      err => {
        console.error('에러발생!');
        console.error(err);
      }
    );
  }, []);

  return (
    <div>Study</div>
  )
}

export default Study