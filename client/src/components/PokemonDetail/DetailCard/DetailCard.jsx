import './DetailCard.css';

export default function DetailCard({pokemon}) {
  const {id, img, name, types, height, weight, hp, attack, defense, speed} = pokemon
  const typesArray = Object.values(types);//Paso de objeto a array

  return (
    <div className='detail-card'>
      la imagen es {img}
      <figure className='container-image'>
        <img src={img} alt={name} className="image"/>
      </figure>
      <div className='container-text'>
        <p className='name'>{name}</p>
        <p className='info'>Id: {id}</p>
        <p>Tipos:</p>
        {typesArray.length === 0 
          ? <p>Sin definir tipo</p> 
          : typesArray.map((type, index) => <p key={index}>{type}</p>)
        }
        <p className='info'>Alto: {height}</p>
        <p className='info'>Ancho: {weight}</p>
        <p className='info'>Vida: {hp}</p>
        <p className='info'>Ataque: {attack}</p>
        <p className='info'>Defensa: {defense}</p>
        <p className='info'>Velocidad: {speed}</p>
      </div>
    </div>
  )
}