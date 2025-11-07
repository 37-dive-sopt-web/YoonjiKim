import { Global, css } from '@emotion/react';
import Header from "./components/Header";
import { useState } from "react";

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
      {activeBtn === 'game' ? '게임페이지' : '랭킹페이지'}
    </>
  );
}

export default App;
