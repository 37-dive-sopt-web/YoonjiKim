import { Global, css } from "@emotion/react";
import Header from "./components/Header";
import { useState } from "react";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  const [activeBtn, setActiveBtn] = useState('game');

  return (
    <>
      <Global styles={globalStyles} />
      <Header activeBtn={activeBtn} onBtnChange={setActiveBtn} />
      {activeBtn === 'game' ? <Game /> : <Ranking />}
    </>
  );
}

export default App;
