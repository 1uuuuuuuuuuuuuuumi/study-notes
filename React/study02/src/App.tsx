import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MyUseState from "./components/MyUseState";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="my_state" element={<MyUseState />} />
      </Routes>
    </>
  );
}

export default App;
