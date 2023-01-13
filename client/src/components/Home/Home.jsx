import style from './Home.module.css'
import pokemonImg from './pokemon.png'

export default function Landing() {
  return (
    <div className={style.container}>
      <img className={style.img} src={pokemonImg} alt="landing-page" />
      <div>
        <p>Pokemon App</p>
        <p>Proyecto individual para bootcamp SoyHenry</p>
        <p>Desarrollado por Carlos Waldo - <span>Linkedin</span> - <span>Whatsapp</span></p>
      </div>
    </div>
  )
}