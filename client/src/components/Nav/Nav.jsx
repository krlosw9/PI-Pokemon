import { Link } from "react-router-dom"
import './Nav.css'

export default function Nav() {
  return (
    <nav>
      <li>
        <Link to='/'>Inicio</Link>
      </li>
      <li>
        <Link to='/pokemon'>Pokemon</Link>
      </li>
      <li>
        <Link to='/pokemon/create'>Nuevo Pokemon</Link>
      </li>
    </nav>
  )
}