import { useNavigate } from "react-router";

const PokemonCard = ({ name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <div
      style={{
        border: "none",
        padding: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        width: "120px",
        textAlign: "center",
        background: "#fdd8ff",
        color: "#ef6aef",
        fontWeight: 600,
      }}
      onClick={handleClick}
    >
      <p>{name}</p>
    </div>
  );
};

export default PokemonCard;
