import { Link } from "react-router-dom"

export default function NotFound(){
  return(
    <div>
      <img src="#" alt="ops" />
      <p>Ops...!</p>
      <p>Pokemon no encontrado.</p>
      <Link to="/pokemon">
        <button>Inicio</button>
      </Link>
    </div>
  )
}