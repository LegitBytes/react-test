import React from "react";
import style from "./assets/styles/App.module.css";

function App() {
  return (
    <div className={`flex-center ${style.appContainer} `}>
      <button type="button" class="btn btn-dark mb-3">
        Open Modal A
      </button>
      <button type="button" class="btn btn-dark">
        Open Modal B
      </button>
    </div>
  );
}

export default App;
