import {Link} from 'react-router-dom'
import style from './Card.module.css';

export default function Card({id, img, name, types}) {
  
  return (
    <Link to={`/pokemon/${id}`}>
    <div>
      <img  className={style.image} src={img} alt={name}/>
      <p className={style.pokemonName}>{name}</p>
      <p>Tipo: </p>
      { types.map((type, index) => <p key={index} className={style.pokemonType}>{type}</p>) }
    </div>
    </Link>
  )
}