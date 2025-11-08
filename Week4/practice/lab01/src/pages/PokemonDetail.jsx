import { useParams, Link } from "react-router";

const PokemonDetail = () => {
  const { name } = useParams();

  return (
    <div>
      <Link to="/">목록으로</Link>
      <h1>{name}</h1>
      <p>상세 정보 ...</p>
    </div>
  );
};

export default PokemonDetail;
