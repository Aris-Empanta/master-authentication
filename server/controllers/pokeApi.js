const axios = require("axios")

module.exports = {
    pokemonList: async (req, res) => {

        //The offset variable is 1 value lower than the id of the
        // first pokemon in the array of the pokemon we fetch.
        const offset = req.query.offset
        //The amount of pokemon we will fetch.
        const limit = 9
       
        try {
      
            const response = await axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)

            //The array of the pokemon the client requests.
            const pokemonSet = response.data.results
            
            //The pokemon names
            const pokemonNames = pokemonSet.map( item => item.name)

            //The urls with the pokemon info 
            const pokemonInfoUrls = pokemonSet.map( item => item.url)

            //the final array with the info to be filled and sent to the client
            const pokemonInfo = []

            //Looping through the array we want to fetch all needed info
            for( let i = 0; i < pokemonInfoUrls.length; i++ ) {

                const results = await axios.get(pokemonInfoUrls[i])

                //the pokemon's id
                const id = results.data.id

                //the pokemon's sprite image
                const image = results.data.sprites.other["dream_world"]["front_default"]

                //the pokemon's type(s)
                const types = results.data.types.length === 1 ?
                              [ results.data.types[0].type.name ]  : 
                              [ results.data.types[0].type.name, results.data.types[1].type.name ]  

                //The pokemon's info object
                const info = {
                              image: image,
                               id: id,                               
                               name: pokemonNames[i],
                               types: types
                             }

                pokemonInfo.push(info)
            }
            res.send(pokemonInfo)
        } 
        catch(error) {

            res.send(error.message)
        }
    }
}