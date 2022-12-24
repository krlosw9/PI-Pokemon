import './Card.css';

export default function Card({img, name}) {
  
  return (
    <div className='card'>
      <img  className='pokemon-image' src={img} alt={name}/>
      <p>{name}</p>
    </div>
  )
}