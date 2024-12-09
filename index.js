const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
const workoutRoutes = require("./routes/workout.js");
const dotenv = require("dotenv");

// server setup
const app = express();
dotenv.config();

//Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Database setup
mongoose.connect(process.env.MONGODB_STRING);
let db= mongoose.connection;
db.on("error",console.error.bind(console, "Error in the database connection!"));
db.once("open", ()=> console.log("Now connected to MongoDB Atlas."));

//[Section]Backend Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

//[SECTION] Server Gateway Response
if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app, mongoose};