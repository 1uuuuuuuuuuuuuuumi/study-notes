import axios from "axios";
import React, { useEffect, useState } from "react";

const FirstEX = () => {
  const [createMonster, setCreateMonster] = useState({});
  const [monsterInfo, setMonsterInfo] = useState({});

  const [render, setRender] = useState(false);

  const inputMonster = (e) => {
    const { name, value } = e.target;
    setCreateMonster({
      ...createMonster,
      [name]: value,
    });
  };

  const createBtn = () => {
    axios
      .post("/api/monsters", createMonster)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setRender(!render);
  };

  useEffect(() => {
    axios
      .get("/api/monsters")
      .then((res) => {
        console.log(res.data);
        setMonsterInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  return (
    <div className="container">
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div>
          <h2>몬스터 생성</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <label>몬스터 이름 : </label>
              <input type="text" name="monsterName" onChange={inputMonster} />
            </div>
            <div>
              <label>몬스터 레벨 : </label>
              <input
                type="number"
                min="1"
                max="100"
                name="monsterLevel"
                onChange={inputMonster}
              />
            </div>
            <div>
              <label>몬스터 체력 : </label>
              <input
                type="number"
                min={1}
                max={1000}
                name="hp"
                onChange={inputMonster}
              />
            </div>
            <button type="button" onClick={createBtn}>
              ⭐️ 생 성 ⭐️
            </button>
          </div>
        </div>

        <div>
          <h2>공격</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <label>공격 대상 : </label>
              <select defaultValue={"1"}>
                <option value="1" disabled>
                  --선택--
                </option>
                {monsterInfo.length > 0 &&
                  monsterInfo.map((monster, index) => {
                    return (
                      <option key={index} value={monster.monsterName}>
                        {monster.monsterName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label>공격력 : </label>
              <input type="number" min={1} max={1000} />
            </div>
            <button type="button">💀 공 격 🗡️</button>
          </div>
        </div>
      </div>

      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "50px auto",
          width: "80%",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2>몬스터 정보</h2>
        {monsterInfo.length === 0 ? (
          <></>
        ) : (
          <table>
            <thead>
              <tr>
                <th>몬스터 이름</th>
                <th>레벨</th>
                <th>체력</th>
              </tr>
            </thead>
            <tbody>
              {monsterInfo.length > 0 &&
                monsterInfo.map((monster, index) => {
                  return (
                    <tr key={index}>
                      <td>{monster.monsterName}</td>
                      <td>{monster.monsterLevel}</td>
                      <td>
                        {monster.hp === 0 ? <>☠️</> : monster.hp}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FirstEX;
