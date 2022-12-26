import {Link} from 'react-router-dom'
import './Card.css';

export default function Card({id, img, name, types}) {
  
  return (
    <Link to={`/pokemon/${id}`}>
    <div className='card'>
      <img  className='pokemon-image' src={img} alt={name}/>
      <p className='pokemonName'>{name}</p>
      <p>Tipo: </p>
      { types.map((type, index) => <p key={index} className='pokemonType'>{type.type.name}</p>) }
    </div>
    </Link>
  )
}