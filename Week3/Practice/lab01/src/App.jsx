import { useState } from 'react';

import Card from './components/Card.jsx'; 
import Header from './components/Header.jsx';
import Search from './components/Search.jsx';

import {members} from './script/members.js';

function App() {

  const [searchMember, setSearchMember] = useState();

  let filteredMembers = members;
  
  if (searchMember) {
    filteredMembers = members.filter((member) =>
      member.name.includes(searchMember)
    );
  }

  return (
    <>
      <Header title={"웹계인 파트원"}/>
      <Search setSearchMember={setSearchMember} />
      <Card members={filteredMembers} />
    </>
  );
}

export default App;
