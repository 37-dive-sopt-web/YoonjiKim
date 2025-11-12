import { Global } from "@emotion/react";
import { globalStyles } from "./styles/reset";

import Header from "./components/Header";
import { useState } from "react";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";

function App() {
  const [activeBtn, setActiveBtn] = useState("game");

  return (
    <>
      <Global styles={globalStyles} />
      <Header activeBtn={activeBtn} onBtnChange={setActiveBtn} />
      {activeBtn === "game" ? <Game /> : <Ranking />}
    </>
  );
}

export default App;
