import { Link } from 'react-router-dom';
import { memo } from 'react';

function Logo(): JSX.Element {
  return (
    <Link className="game__back" to="/">
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
    </Link>
  );
}

export default memo(Logo);
