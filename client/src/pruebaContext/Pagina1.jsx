import { useContext } from "react"
// import { useSelector } from "react-redux";
import { DataContext } from "./context/DataProvider";

export default function Pagina1(){
  // const allPokemon = useSelector(store => store.allPokemon);
  const {data} = useContext(DataContext);

  return(
    <div>
      <h1>Pagina 1</h1>
      <hr />
      <pre>
        {JSON.stringify(data)}
      </pre>

      {/* {allPokemon.map(poke => (
        <div key={poke.id}>
          name: {poke.name}
        </div>
      ))} */}
    </div>
  )
}