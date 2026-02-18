import { useState } from "react";

function MyUseState() {
  const [hp, setHp] = useState(100);

  const pageEvents = {
    minus: () => {
      if (hp > 0) {
        setHp(hp - 10);
      }
    },
    plus: () => {
      setHp(hp + 10);
      if (hp >= 100) {
        setHp(100);
      }
    },
  };

  return (
    <>
      <div>
        <p>체력: {hp}</p>
        <button
          type="button"
          onClick={() => {
            pageEvents.minus();
          }}
        >
          공격
        </button>
        <button
          type="button"
          onClick={() => {
            pageEvents.plus();
          }}
        >
          회복
        </button>
      </div>
    </>
  );
}

export default MyUseState;
