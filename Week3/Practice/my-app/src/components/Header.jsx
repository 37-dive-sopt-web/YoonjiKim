// Header.jsx

import style from './Header.module.css';

const Header = ({ title }) => {
  return (
  <h1 className={style.header}>{title}</h1>
  );
};

export default Header;
