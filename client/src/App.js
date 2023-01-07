import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Pokemon from './components/Pokemon/Pokemon';
import Home from './components/Home/Home';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
// import FormPrueba from './components/FormPrueba/FormPrueba';
import ContainerContext from "./pruebaContext/ContainerContext";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pokemon' element={<Pokemon/>}/>
        <Route path='/pokemon/:id' element={<PokemonDetail/>}/>
        <Route path='/pokemon/create' element={<PokemonCreate/>}/>
        {/* <Route path='/prueba' element={<FormPrueba/>}/> */}
        <Route path='/pruebaContext' element={<ContainerContext/>}/>
      </Routes>
    </div>
  );
}

export default App;
