import { Link } from "react-router-dom"
import './Nav.css'

export default function Nav() {
  return (
    <nav>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/pokemon'>Pokemon</Link>
      </li>
      <li>
        <Link to='/pokemon/create'>Create</Link>
      </li>
    </nav>
  )
}