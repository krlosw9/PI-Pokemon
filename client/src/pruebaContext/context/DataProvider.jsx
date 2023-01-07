// import { useEffect,createContext } from "react"
import { createContext, useState } from "react"
// import {useDispatch, useSelector} from 'react-redux'
// import {getAll} from '../../redux/actions/'

export const DataContext = createContext();

const dataFixed = {
  id: 1,
  name: "Krlos"
}

export const DataProvider = ({children}) => {
  // const dispatch = useDispatch();

  // let allPokemon = useSelector(store => store.allPokemon);
  
  // useEffect(() => {
  //   dispatch(getAll());
  // },[dispatch])

  const [data, setData] = useState(dataFixed);

  return(
    <DataContext.Provider value={{
      data,
      setData
    }}>
      {children}
    </DataContext.Provider>
  )
}