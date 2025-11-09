import { useNavigate } from "react-router";

const PokemonCard = ({name}) => {
 const navigate = useNavigate();

 const handleClick = () => {
  navigate(`/pokemon/${name}`);
 };

 return (
  <div onClick={handleClick}>
    <p>{name}</p>
  </div>
 );
};

export default PokemonCard;