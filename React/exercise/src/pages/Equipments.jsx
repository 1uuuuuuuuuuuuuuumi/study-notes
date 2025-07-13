import axios from "axios";
import './MonsterEquipment.css';
import React, { useEffect, useState } from "react";

const Equipments = () => {
  const [createEquipment, setCreateEquipment] = useState({});
  const [getEquipments, setGetEquipments] = useState([]);
  const [updateEquipment, setUpdateEquipment] = useState({});

  const [render, setRender] = useState(false);

  const inputEquipment = (e) => {
    const { name, value } = e.target;
    setCreateEquipment({
      ...createEquipment,
      [name]: value,
    });
  };

  const createEquipmentBtn = () => {
    axios
      .post("/api/equipments", createEquipment)
      .then((res) => {
        alert(res.data);

        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateInputEquipment = (e) => {
    const { name, value } = e.target;
    setUpdateEquipment({
      ...updateEquipment,
      [name]: value,
    });
  };

  const updateEquipmentBtn = () => {
    axios
      .put("/api/equipments/update", updateEquipment)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRender(!render);
  };

  const deleteEquipmentBtn = (equipmentName) => {
    axios
      .delete(`/api/equipments/delete/${equipmentName}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setRender(!render);
  };

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("api/equipments")
        .then((res) => {
          setGetEquipments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
  }, [render]);

  return (
    <div className="equipments-container">
      <div className="equipments-crud">
        <div>
          <h2>장비 생성 - 무기</h2>
          <div>
            <label>장비 타입 : </label>
            <select
              name="equipmentType"
              defaultValue={"none"}
              onChange={inputEquipment}
            >
              <option value="none" disabled>
                --선택--
              </option>
              <option value="weapon">무기</option>
              <option value="armor">방어구</option>
            </select>
          </div>
          <div>
            <label>장비 이름 : </label>
            <input type="text" name="equipmentName" onChange={inputEquipment} />
          </div>

          {createEquipment.equipmentType === undefined ? null : (
            <div>
              <label>
                {createEquipment.equipmentType === "weapon"
                  ? "공격력"
                  : "방어력"}{" "}
                :{" "}
              </label>
              <input
                type="number"
                name="equipmentStat"
                onChange={inputEquipment}
              />
            </div>
          )}
          <button type="button" onClick={createEquipmentBtn}>
            ⭐️ 장 비 생 성 ⭐️
          </button>
        </div>

        <div>
          <h2>장비 수정</h2>
          <div>
            <label>장비 이름 : </label>
            <select
              name="equipmentName"
              defaultValue={"none"}
              onChange={updateInputEquipment}
            >
              <option value="none" disabled>
                --선택--
              </option>
              {getEquipments.length > 0 &&
                getEquipments.map((equipment, i) => {
                  return (
                    <option key={i} value={equipment.equipmentName}>
                      {equipment.equipmentName}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>장비 능력치 : </label>
            <input
              type="number"
              name="equipmentStat"
              onChange={updateInputEquipment}
            />
          </div>
          <button type="button" onClick={updateEquipmentBtn}>
            {" "}
            장 비 수 정{" "}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>장비 타입</th>
            <th>장비 이름</th>
            <th>장비 능력치</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {getEquipments.length > 0 &&
            getEquipments.map((equipment, index) => {
              return (
                <tr key={index}>
                  <td>{equipment.equipmentType}</td>
                  <td>{equipment.equipmentName}</td>
                  <td>{equipment.equipmentStat}</td>
                  <td>
                    <button type="button" onClick={()=>{
                      deleteEquipmentBtn(equipment.equipmentName);
                    }}>❌</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Equipments;
