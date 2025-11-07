import Header from "./components/Header";
import { useState } from "react";


function App() {
  const [activeBtn, setActiveBtn] = useState('game');

  return (
    <>
      <Header activeBtn={activeBtn} onBtnChange={setActiveBtn} />
      {activeBtn === 'game' ? '게임페이지' : '랭킹페이지'}
    </>
  );
}

export default App;
