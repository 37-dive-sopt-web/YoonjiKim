import style from "./Card.module.css";

const Card = ({ members }) => {
  const WebPart = ({ name, github, engName }) => {
    return (
      <div className={style.card}>
        <h2>{name}</h2>
        <p>깃허브: {github}</p>
        <p>영어 이름: {engName}</p>
      </div>
    );
  };
  return (
    <div className={style.container}>
      {members.map((member) => (
        <WebPart
          key={member.id}
          name={member.name}
          github={member.github}
          engName={member.englishName}
        />
      ))}
    </div>
  );
};
export default Card;
