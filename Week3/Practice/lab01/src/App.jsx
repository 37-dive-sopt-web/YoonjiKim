// App.jsx에 복붙!
// index.css, App.css는 삭제해주세요.

import Card from './components/Card.jsx'; 
import Header from './components/Header.jsx';

import {members} from './script/members.js';

function App() {
  return (
    <>
      <Header title={"웹계인 파트원"}/>
      <Card members={members} />
    </>
  );
}

export default App;
