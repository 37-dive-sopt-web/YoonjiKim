const Search = ({ setSearchMember }) => {
  return (
    <div>
      <input type="text" placeholder="이름을 입력하세요" onChange={(e) => setSearchMember(e.target.value)} />
    </div>
  );
}

export default Search;