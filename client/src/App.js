import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Pokemon from './components/Pokemon/Pokemon';
import Home from './components/Home/Home';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pokemon' element={<Pokemon/>}/>
        <Route path='/pokemon/:id' element={<PokemonDetail/>}/>
        <Route path='/pokemon/create' element={<Pokemon/>}/>
      </Routes>
    </div>
  );
}

export default App;
