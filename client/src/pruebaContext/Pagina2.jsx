import { useContext } from "react"
import { DataContext } from "./context/DataProvider"

export default function Pagina2() {
  const {data} = useContext(DataContext)

  return (
    <div>
      <h1>Pagina 2</h1>
      <hr />
      <pre>
        {JSON.stringify(data)}
      </pre>
    </div>
  )
}