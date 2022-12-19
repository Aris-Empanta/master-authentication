const express = require('express')
const app = express()
const cors = require('cors')

//Importing routes
const registerRoutes = require("./routes/register")

//The configurations to accept data from frontend
app.use(cors())
app.use(express.json());
    
app.post('/login', (req, res) => {

    console.log(req.body)
    console.log(req.session)
})

//Initializing routes middleware
app.use("/register", registerRoutes)


app.listen(5000, () => console.log("app is listening to port 5000"))