import { useContext } from "react"
import { DataContext } from "./context/DataProvider"

export default function ChangeData() {
  const {setData} = useContext(DataContext);
  return(
    <div>
      <button onClick={() => setData({id: 2, name: "Nuevo_Nombre" })}>Cambiar info</button>
    </div>
  )
}