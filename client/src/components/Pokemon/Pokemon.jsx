import { useEffect } from "react"
import {connect} from 'react-redux'
import { getAll } from "../../redux/actions";
import PokemonCards from '../PokemonCards/PokemonCards';

function Home(props) {

    useEffect(()=>{
        props.getAll();
    },[]);

    return (
        // <div>Vamos a traer todos los putos pokemon</div>
        <PokemonCards pokemons={props.showPokemons}/>
    )
}

function mapStateToProps(state) {
    return {
        showPokemons: state.allPokemon
    }
}

export default connect(mapStateToProps, {getAll})(Home)