import { serverHost } from "../variables/serverHost"
//The function below fetches 9 pokemon from the poke Api. The "offset" state variable
//represents the id of the first pokemon in the array minus 1. 
export const fetchPokemon = async ( axios, offset, pokemon, setPokemon, setOffset ) => {


    const response = await axios.get( serverHost + "pokemon-api/list?offset=" + offset, 
                                      { withCredentials: true } )

    //The fetched pokemon are added to the existing pokemon list                                 
    setPokemon( [ ...pokemon, ...response.data ] )

    //We increase the offset indicator by 9 for the next fetch
    setOffset( offset + 9 )
}