import axios from "axios";
import React, { useEffect, useState } from "react";

const FirstEX = () => {
  const [createMonster, setCreateMonster] = useState({});
  const [monsterInfo, setMonsterInfo] = useState({});
  const [monsterAttack, setMonsterAttack] = useState({});
  const [monsterRecover, setMonsterRecover] = useState({});

  const [render, setRender] = useState(false);

  const inputMonster = (e) => {
    const { name, value } = e.target;
    setCreateMonster({
      ...createMonster,
      [name]: value,
    });
  };

  const inputAttack = (e) => {
    const { name, value } = e.target;
    setMonsterAttack({
      ...monsterAttack,
      [name]: value,
    });
  };

  const inputRecover = (e) => {
    const { name, value } = e.target;
    setMonsterRecover({
      ...monsterRecover,
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

  const attackBtn = () => {
    axios
      .put("/api/monsters/attack", monsterAttack)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setRender(!render);
  };

  const recoverBtn = () => {
    axios
      .put("/api/monsters/recover", monsterRecover)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setRender(!render);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get("/api/monsters")
        .then((res) => {
          console.log(res.data);
          setMonsterInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000); // 1000ms delay to simulate a loading state

    return () => clearTimeout(timer);
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
              <select
                defaultValue={"none"}
                name="monsterName"
                onChange={inputAttack}
              >
                <option value="none" disabled>
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
              <input
                type="number"
                name="damage"
                min={1}
                max={1000}
                onChange={inputAttack}
              />
            </div>
            <button type="button" onClick={attackBtn}>
              💀 공 격 🗡️
            </button>
          </div>
        </div>

        <div>
          <h2>회복</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <label>회복 대상 : </label>
              <select
                defaultValue={"none"}
                name="monsterName"
                onChange={inputRecover}
              >
                <option value="none" disabled>
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
              <label>회복력 : </label>
              <input
                type="number"
                name="heal"
                min={1}
                max={1000}
                onChange={inputRecover}
              />
            </div>
            <button type="button" onClick={recoverBtn}>💊 회 복 🧪</button>
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
                <th>제거</th>
              </tr>
            </thead>
            <tbody>
              {monsterInfo.length > 0 &&
                monsterInfo.map((monster, index) => {
                  return (
                    <tr key={index}>
                      <td>{monster.monsterName}</td>
                      <td>{monster.monsterLevel}</td>
                      <td>{monster.hp === 0 ? <>☠️</> : monster.hp}</td>
                      <td>
                        <button type="button">❌</button>
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
