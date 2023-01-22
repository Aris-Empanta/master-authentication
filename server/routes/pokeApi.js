const express = require("express")
const router = express.Router()
const controller = require("../controllers/pokeApi")

router.get("/list", controller.pokemonList)

module.exports = router