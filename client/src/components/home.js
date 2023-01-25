import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { logout } from '../functions/logout';
import { fetchPokemon } from '../functions/home';
import { formatId, firstLetterCapital } from '../functions/general';
import "../css/home.css"
import "../css/pokemonTypes.css"


export const Home = ({setUser}) => {

    const [ offset, setOffset ] = useState(0)
    const [ pokemon, setPokemon ] = useState([])

    useEffect(() => {
                  //We fetch the first 9 pokemon for the list
                  fetchPokemon(axios, offset, pokemon, setPokemon, setOffset)
              }, [])

    return(<div>
             <button onClick={ () => logout( axios, setUser ) }> Logout </button>
             <Link to="/profile"> Profile </Link>
             <div id='pokemonListWrapper'>
             { pokemon.map( item => <div className='individualPokemonWrapper'>
                                      <img src={ item.image }  className="pokemonListImage"/>                                      
                                      <p className="pokemonListId">  { formatId(item.id) }</p>
                                      <p className="pokemonListName"> { firstLetterCapital(item.name) } </p>
                                      <div className='typesWrapper'>
                                        { item.types.map(type => <p className={ "pokemonType " + type } > 
                                                                    { firstLetterCapital(type) } 
                                                                 </p> )}
                                      </div>
                                    </div>)}
             </div>
             <button onClick={ () => fetchPokemon(axios, offset, pokemon, setPokemon, setOffset) }>
               more
             </button>
           </div>)
}