import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { logout } from '../functions/logout';
import { fetchPokemon } from '../functions/home';
import "../css/home.css"


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
             { pokemon.map( item => <div className='pokemonListWrapper'>
                                      <img src={ item.image }  className="pokemonListImage"/>
                                      <p className="pokemonListName"> { item.name } </p>
                                      <p className="pokemonListId"> { item.id }</p>
                                      { item.types.map( item => <p> { item } </p>)}
                                    </div>)}
             <button onClick={ () => fetchPokemon(axios, offset, pokemon, setPokemon, setOffset) }>
               more
             </button>
           </div>)
}