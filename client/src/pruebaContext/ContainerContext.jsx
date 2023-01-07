import ChangeData from "./ChangeData";
import { DataProvider } from "./context/DataProvider";
import Pagina1 from "./Pagina1";
import Pagina2 from "./Pagina2";

export default function ContainerContext() {
  
  return (
    <DataProvider>
      <div className="container">
        <Pagina2 />
        <Pagina1 />

        <ChangeData />
      </div>
    </DataProvider>
  )
}