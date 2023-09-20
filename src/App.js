import React, { useEffect, useState } from "react";
import style from "./assets/styles/App.module.css";
import ModalA from "./Component/ModalA/ModalA";
import ModalB from "./Component/ModalB/ModalB";
import Button from "react-bootstrap/Button";

function App() {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleOpenModalA = () => {
    setActiveTab(1);
    setShowModalA(true);
    window.history.pushState(null, "", "/modal-a");
  };
  const handleOpenModalB = () => {
    setActiveTab(2);
    setShowModalB(true);
    window.history.pushState(null, "", "/modal-b");
  };
  useEffect(() => {
    window.history.pushState(null, "", "/");
  }, []);

  return (
    <div className={`flex-center ${style.appContainer} `}>
      {showModalA && activeTab === 1 && (
        <ModalA
          showModalA={showModalA}
          setShowModalA={setShowModalA}
          setActiveTab={setActiveTab}
          setShowModalB={setShowModalB}
        />
      )}
      {showModalB && activeTab === 2 && (
        <ModalB
          showModalB={showModalB}
          setShowModalB={setShowModalB}
          setActiveTab={setActiveTab}
          setShowModalA={setShowModalA}
        />
      )}
      <Button
        type=""
        onClick={handleOpenModalA}
        style={{
          backgroundColor: "var(--buttonAColor)",
          borderColor: "transparent",
        }}
      >
        {" "}
        Open Modal A
      </Button>
      <Button
        type=""
        onClick={handleOpenModalB}
        style={{
          backgroundColor: "var(--buttonBColor)",
          borderColor: "transparent",
        }}
      >
        {" "}
        Open Modal B
      </Button>
    </div>
  );
}

export default App;
