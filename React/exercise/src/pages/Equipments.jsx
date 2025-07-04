import axios from "axios";
import React, { useState } from "react";

const Equipments = () => {
  const [createEquipment, setCreateEquipment] = useState({});

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <button type="button" onClick={createEquipmentBtn}>⭐️ 장 비 생 성 ⭐️</button>
        </div>
        <div></div>
        <div></div>
      </div>

      <table></table>
    </div>
  );
};

export default Equipments;
